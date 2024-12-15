import dayjs from 'dayjs';

const compare = ( a, b ) => {
  return ( a.timestamp < b.timestamp ) ? -1 : ( a.timestamp > b.timestamp ) ? 1 : 0;
}

const dayRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
const isAllDay = (date) => {
  return dayRegex.test(date);
}

export const forEntityFromState = (hass, config, numberOfDays = undefined) => {
  if(!hass || !config || !config.entity || !hass.states || !hass.states[config.entity]) return null;

  const events = [];
  const clones = [];
  const stateObject = hass.states[config.entity];
  for (const [name, calendar] of Object.entries(stateObject.attributes.calendars)) {
    const rawEvents = calendar.events;
    rawEvents.forEach(rawEvent => {
      const event = {
        calendar: name,
        isAllDay: isAllDay(rawEvent.start),
        summary: rawEvent.summary,
        location: rawEvent.location
      };
      event.startDateTime = event.isAllDay ? dayjs(`${rawEvent.start}T00:00:00`) : dayjs(rawEvent.start),
      event.endDateTime = event.isAllDay ? dayjs(`${rawEvent.end}T23:59:59`) : dayjs(rawEvent.end),
      event.durationInMinutes = event.endDateTime.diff(event.startDateTime, 'minutes')
      if( !event.isAllDay ) {
        event.startTime = event.startDateTime.format('h:mm');
        event.startMeridian = event.startDateTime.format('A');
        if( event.durationInMinutes % 60 == 0) {
          event.duration = event.durationInMinutes / 60;
          event.durationUnit = event.duration == 1 ? 'HR' : 'HRS';
        } else {
          event.duration = event.durationInMinutes;
          event.durationUnit = 'MIN';
        }
        event.startTimeShort = event.startDateTime.minute() == 0 ? event.startDateTime.format('hA').slice(0, -1) : event.startDateTime.format('h:mmA').slice(0, -1);
      } else {
        event.duration = event.endDateTime.diff(event.startDateTime, 'day');
        event.durationUnit = event.duration == 1 ? 'DAY' : 'DAYS';
        let numDays = event.endDateTime.diff(event.startDateTime, 'day');
        while( numDays > 1 ) {
          const clone = Object.assign({}, event);
          clone.startDateTime = clone.startDateTime.add(numDays - 1, 'day');
          clone.duration = clone.endDateTime.diff(clone.startDateTime, 'day');
          clone.durationUnit = clone.duration == 1 ? 'DAY LEFT' : 'DAYS LEFT';
          clone.timestamp = clone.startDateTime.unix();
          clones.push(clone);
          numDays--;
        }
      }
      event.timestamp = event.startDateTime.unix();
      events.push(event);
    })
  }
  events.push(...clones);
  // Sort events by timestamp
  events.sort(compare);
  // Pack events into days
  const days = [];
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
  if(numberOfDays) {
    let daysOfWeek = [];
    for (let i = 0; i < numberOfDays; i++) {
      const day = days[i];
      const date = today.add(i, 'day');
      if(!day) {
        days[i] = {
          label: date.format('dddd'),
          dayNumber: date.format('D'),
          events: []
        }
      } else {
        day.dayNumber = day.events[0].startDateTime.format('D');
      }
      daysOfWeek.push(date.format('ddd'));
    }
    return {
      daysOfWeek: daysOfWeek.slice(0, 7),
      days
    }
  }
  return days;
}