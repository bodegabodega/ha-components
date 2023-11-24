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

export const getEvents = async (hass, config) => {
  let events;
  if(config.mode == 'development') {
    events = sample;
  } else {
    const start = dayjs().startOf('day').toISOString();
    const end = dayjs().add(config.dayLookahead, 'day').endOf('day').toISOString();
    events = await hass.callApi('get', `calendars/calendar.famalam?start=${start}&end=${end}`);
  }
  console.log(events)
  let today = [];
  let tomorrow = [];
  let upcoming = [];
  events.forEach(event => {
    const evt = {};
    evt.isAllDay = !!event.start.date;
    const start = evt.isAllDay ? dayjs(`${event.start.date}T00:00:00`) : dayjs(event.start.dateTime);
    const end = evt.isAllDay ? dayjs(`${event.end.date}T23:59:59`) : dayjs(event.end.dateTime);
    const duration = end.diff(start, 'minutes');
    if( !evt.isAllDay ) {
      evt.time = start.isToday() || start.isTomorrow() ? start.format('h:mm') : start.format('dddd').toUpperCase();
      evt.meridian = start.isToday() || start.isTomorrow() ? start.format('A') : null;
      if( duration % 60 == 0) {
        evt.duration = duration / 60;
        evt.duration_unit = evt.duration == 1 ? 'HR' : 'HRS';
      } else {
        evt.duration = duration;
        evt.duration_unit = 'MIN';
      }
    } else {
      evt.duration = end.diff(start, 'day');
      evt.duration_unit = evt.duration == 1 ? 'DAY' : 'DAYS';
    }
    evt.summary = event.summary;
    evt.location = event.location;
    evt.timestamp = start.unix();
    if(start.isToday()) {
      today.push(evt);
    } else if (start.isTomorrow()) {
      tomorrow.push(evt);
    } else {
      upcoming.push(evt);
    }
  })
  today.sort(compare);
  tomorrow.sort(compare);
  upcoming.sort(compare);
  return { today, tomorrow, upcoming };
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