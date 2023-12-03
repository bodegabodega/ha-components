import sample from '../../data/calendar-list-events-response';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import relativeTime  from 'dayjs/plugin/relativeTime';
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(relativeTime);

export const INITIALIZING = 'INITIALIZING';
export const FETCHING = 'FETCHING';
export const LOADED = 'LOADED';
export const RETRYING = 'RETRYING';
export const ERRORED = 'ERRORED';

const compare = ( a, b ) => {
  return ( a.timestamp < b.timestamp ) ? -1 : ( a.timestamp > b.timestamp ) ? 1 : 0;
}

export default class CalendarEventsService {
  constructor(hass, config) {
    this._hass = hass;
    this._config = config;
    this._events = null;
    this._status = INITIALIZING;
    this._lastFetchedTimestamp = null;
    this._retryCount = 0;
    this._maxRetries = 5;
    this._errorMessage = null;
  }
  get status() {
    return this._status;
  }
  async fetch() {
    this._status = FETCHING;
    let events;
    if(this._config.mode == 'development') {
      events = sample;
    } else {
      const start = dayjs().startOf('day').toISOString();
      const end = dayjs().add(this._config.dayLookahead, 'day').endOf('day').toISOString();
      const promises = this._config.entities.map(entity => this._hass.callApi('get', `calendars/${entity}?start=${start}&end=${end}`))
      try {
        const allEvents = await Promise.all(promises);
        events = allEvents.flat();
        this._lastFetchedTimestamp = Date.now();
        this._retryCount = 0;
        this._errorMessage = null;
        this._status = LOADED;
      } catch (error) {
        this._errorMessage = error.message;
        if( this._retryCount > this._maxRetries ) {
          this._status = RETRYING;
          this._retryCount++;
          const timeout = Math.pow(2, this._retryCount) * 1000;
          this.setTimeout(this.fetch, timeout);
        } else {
          this._status = ERRORED;
        }
      }
    }
    return events;
  }
  async fetchAndParseEvents() {
    const rawEvents = await this.fetch();
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
          event.duration = event.durationInMinutes;
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
          clone.duration = clone.endDateTime.diff(clone.startDateTime, 'day');
          clone.durationUnit = clone.duration == 1 ? 'DAY LEFT' : 'DAYS LEFT';
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
    this._events = days;
  }
  async getEvents() {
    if( !this._events || // we don't have events
        !this._lastFetchedTimestamp || // we've never fetched events
        (Date.now() - this._lastFetchedTimestamp) > this._config.updateFrequency ) { // we haven't fetched events in a while
      await this.fetchAndParseEvents();
    }
    return this._events;
  }
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