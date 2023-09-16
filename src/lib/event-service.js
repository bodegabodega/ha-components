import sample from './../../data/calendar-list-events-response.json';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const compare = ( a, b ) => {
  return ( a.timestamp < b.timestamp ) ? -1 : ( a.timestamp > b.timestamp ) ? 1 : 0;
}


export const getEvents = async (hass, config) => {
  let events;
  if(config.mode == 'development') {
    events = sample;
  } else {
    const start = dayjs().startOf('day').toISOString();
    const end = dayjs().add(1, 'day').endOf('day').toISOString();
    events = await hass.callApi('get', `calendars/calendar.famalam?start=${start}&end=${end}`);
  }
  let today = [];
  let tomorrow = [];
  events.forEach(event => {
    const evt = {};
    const start = dayjs(event.start.dateTime);
    const end = dayjs(event.end.dateTime);
    const duration = end.diff(start, 'minutes');
    if( duration < 720 ) { // less than 12 hours
      evt.time = start.format('h:mm');
      evt.meridian = start.format('A');
      if( duration % 60 == 0) {
        evt.duration = duration / 60;
        evt.duration_unit = evt.duration == 1 ? 'HR' : 'HRS';
      } else {
        evt.duration = duration;
        evt.duration_unit = 'MIN';
      }
    }
    evt.summary = event.summary;
    evt.location = event.location;
    evt.timestamp = start.unix();
    if(start.isToday()) {
      today.push(evt);
    } else if (start.isTomorrow()) {
      tomorrow.push(evt);
    }
  })
  today.sort(compare);
  tomorrow.sort(compare);
  return { today, tomorrow };
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