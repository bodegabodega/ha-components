import sample from './../../data/calendar-list-events-response.json';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export const getEvents = async (hass, config) => {
  let events;
  if(config.mode == 'development') {
    events = sample.events;
  } else {
    const start = dayjs().startOf('day').toISOString();
    const end = dayjs().add(1, 'day').endOf('day').toISOString();
    events = await hass.callApi('get', `calendars/calendar.famalam?start=${start}&end=${end}`);
  }
  let today = [];
  let tomorrow = [];
  events.forEach(event => {
    const evt = {};
    const start = dayjs(event.start);
    const end = dayjs(event.end);
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
    if(start.isToday()) {
      today.push(evt);
    } else if (start.isTomorrow()) {
      tomorrow.push(evt);
    }
  })
  return { today, tomorrow }
}