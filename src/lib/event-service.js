import sample from '../../data/calendar-list-events-response';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import relativeTime  from 'dayjs/plugin/relativeTime';
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(relativeTime);

const compare = ( a, b ) => {
  return ( a.timestamp < b.timestamp ) ? -1 : ( a.timestamp > b.timestamp ) ? 1 : 0;
}

const fetch = async config => {
  let events;
  if(config.mode == 'development') {
    events = sample;
  } else {
    const start = dayjs().startOf('day').toISOString();
    const end = dayjs().add(config.dayLookahead, 'day').endOf('day').toISOString();
    events = await hass.callApi('get', `calendars/calendar.famalam?start=${start}&end=${end}`);
  }
  return events;
}

export const getDays = async (hass, config) => {
  const rawEvents = await fetch(config);
  const days = [];

  // Transform and normalize events
  const events = []; 
  rawEvents.forEach(rawEvent => {
    const event = {};
    event.isAllDay = !!rawEvent.start.date;
    event.summary = rawEvent.summary;
    event.location = rawEvent.location;
    event.startDateTime = event.isAllDay ? dayjs(`${rawEvent.start.date}T00:00:00`) : dayjs(rawEvent.start.dateTime);
    event.endDateTime = event.isAllDay ? dayjs(`${rawEvent.end.date}T23:59:59`) : dayjs(rawEvent.end.dateTime);
    event.durationInMinutes = event.endDateTime.diff(event.startDateTime, 'minutes');
    if( !event.isAllDay ) {
      event.startTime = event.startDateTime.format('h:mm');
      event.startMeridian = event.startDateTime.format('A');
      if( event.durationInMinutes % 60 == 0) {
        event.duration = event.durationInMinutes / 60;
        event.durationUnit = event.duration == 1 ? 'HR' : 'HRS';
      } else {
        event.duration = durationInMinutes;
        event.durationUnit = 'MIN';
      }
    } else {
      event.duration = event.endDateTime.diff(event.startDateTime, 'day');
      event.durationUnit = event.duration == 1 ? 'DAY' : 'DAYS';
    }
    event.timestamp = event.startDateTime.unix();
    events.push(event);
  })
  // Clone and duplicate all day events
  events.forEach(event => {
    if( event.isAllDay ) {
      let numDays = event.endDateTime.diff(event.startDateTime, 'day');
      while( numDays > 1 ) {
        const clone = Object.assign({}, event);
        clone.startDateTime = clone.startDateTime.add(numDays - 1, 'day');
        clone.timestamp = clone.startDateTime.unix();
        events.push(clone);
        numDays--;
      }
    }
  })
  // Sort events by timestamp
  events.sort(compare);
  // Pack events into days
  const today = dayjs().startOf('day');
  events.forEach(event => {
    const dayIntoFuture = event.startDateTime.diff(today, 'day');
    if( !days[dayIntoFuture] ) {
      const day = {
        label: dayIntoFuture == 0 ? 'Today' : dayIntoFuture == 1 ? 'Tomorrow' : event.startDateTime.format('dddd'),
        events: []
      }
      days[dayIntoFuture] = day;
    }
    days[dayIntoFuture].events.push(event);
  })
  return days;
}

/**
 * [{
  "start": {
      "dateTime": "2023-09-15T12:00:00-04:00"
                   YYYY-MM-DDTHH:mm:ssZ
  },
  "end": {
      "dateTime": "2023-09-15T13:00:00-04:00"
  },
  "summary": "Daddy: Wonder Lofts visit",
  "description": null,
  "location": "720 Clinton St\nHoboken, NJ, United States",
  "uid": null,
  "recurrence_id": null,
  "rrule": null
}, {
 */