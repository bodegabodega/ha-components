import sample from './../../data/calendar-list-events-response.json';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export const getEvents = () => {
  let today = [];
  let tomorrow = [];
  const events = sample.events;
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

/*
{
  "events": [
    {
      "start": "2023-09-12T15:15:00-04:00",
      "end": "2023-09-12T16:15:00-04:00",
      "summary": "Maddie: Gymnastics class",
      "location": "Diamond Gymnastics\n738 Willow Ave, Hoboken, NJ  07030, United States"
    },
    */