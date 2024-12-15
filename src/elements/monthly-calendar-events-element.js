import { html, css, nothing} from 'lit';
import { forEntityFromState } from '../lib/calendar-events';
import { BaseElement } from './base-element';
import { stringified } from '../lib/utilities/has-changed';
import { hostDisplayNone } from '../lib/utilities/dom';

export class MonthlyCalendarEventsElement extends BaseElement {
  static get properties() {
    return {
      _days: { state: true, hasChanged: stringified }
    }
  }
  static getDefaults() {
    return {
    }
  }
  constructor() {
    super('Calendar Events');
  }
  setConfig(config) {
    if (!config.entity) throw new Error("You need to define a sensor entity");
    this.config = Object.assign(MonthlyCalendarEventsElement.getDefaults(), config);
  }
  validate() {
    this._days = forEntityFromState(this.hass, this.config, 14);
    console.log(this._days)
  }
  getEventList(label, events) {
    return events && events.length > 0
    ? html`
      <div class="event-list-container">
        <h3>${label}</h3>
          <div class="event-list">
          ${events.map(event => html`
            <div class="event${event.isAllDay ? ' all-day' : ''}">
              <div class="start-time">
              ${event.startTime
                ? html`<span class="time">${event.startTime}</span><span class="meridian">${event.startMeridian}</span>`
                : html`<span class="all-day">ALL DAY</span>`
              }
              </div>
              <div class="details">
                <div class="summary">${event.summary}</div>
                ${event.location
                  ? html`<div class="location">${event.location}</div>` : nothing
                }
              </div>
              <div class="duration">
                ${event.duration
                  ? html`<span class="hours">${event.duration}</span><span class="unit">${event.durationUnit}</span>`
                  : nothing
                }
              </div>
            </div>
          `)}
          </div>
        </div>
      `
    : hostDisplayNone;
  }
  getMonthlyEventList(days) {
    return days
    ? html`
      <div class="monthly-calendar-events">
        <h2>September <span class="muted">2024</span></h2>
        <ul class="weekdays">
          ${days.daysOfWeek.map(day => html`
            <li><abbr title="S">${day}</abbr></li>
          `)}
        </ul>

        <ol class="day-grid">
          ${days.days.map(day => html`
            <li>
              <div class="day-number ${day.label.toLowerCase()}">${day.dayNumber}</div>
              ${day.events.map(event => html`
                <div class="event${event.isAllDay ? ' all-day' : ''}">
                  <div class="event-name">${event.summary}</div>
                  ${event.isAllDay
                    ? nothing
                    : html`<div class="event-time">${event.startTimeShort}</div>`
                  }
                </div>
              `)}
            </li>
          `)}
        </ol>
      </div>
      `
    : hostDisplayNone;
  }

  render() {
    this.log('Rendering?', !!(this._days && this.visibleToUser));
    return this._days && this.visibleToUser
      ? this.getMonthlyEventList(this._days)
      : this._days && this._days.length == 0
      ? nothing
      : nothing;
  }

  static get styles() {
    return [
      BaseElement.styles,
      css`
      :host {
        font-family: "Open Sans", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        font-variation-settings:
          "wdth" 80;
        background-color: var(--color-bg);
      }
      h2 {
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 2px 0 4px 0;

        font-size: 24px;
        font-weight: bold;
        color: var(--color-text-primary)
      }
      .muted {
        font-weight: normal;
      }
      ul, ol {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        grid-gap: 1px;
        margin: 0 auto;
        padding: 0;
      }

      li {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin-left: 0;
      }
      ol.day-grid {
        border: 1px solid  var(--color-bg);
        border-top: 1px solid var(--color-bg);
        background-color: var(--color-bg);
      }
      .day-grid li {
        background-color: var(--color-glass);
      }
      .day-number {
        font-family: 'Montserrat', sans-serif;
        align-self: flex-end;
        color: var(--color-text-secondary);
        width: 100%;
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        border-radius: 50%;
        text-align: center;
        margin: 2px;
      }
      .day-number.today {
        background-color: var(--color-bg);
        color: var(--color-text-primary);
        font-weight: bold;
      }

      ul.weekdays {
        font-family: 'Montserrat', sans-serif;
        color: var(--color-text-tertiary);
      }

      ul.weekdays li {
        justify-content: right;
        font-size: 14px;
        font-weight: normal;
        text-align: right;
        margin: 2px 4px;
      }

      ol.day-grid li {
        height: 125px;
      }
      
      .event {
        display: flex;
        font-size: 14px;
        font-weight: 500;
        padding: 0 3px;
        margin: 0 3px 2px 0;
        border-left: 2px solid red;
        color: var(--color-text-primary);
      }
      .event.all-day {
        background-color: red;
        margin-right: 0;
      }
      .event-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .event-time {
        font-size: 12px;
        line-height: 19px;
        font-weight: 700;
        white-space: nowrap;
      }

      ul.weekdays abbr[title] {
        border: none;
        // font-weight: 800;
        text-decoration: none;
      }

      @media all and (max-width: 800px) {
        ul, ol {
          grid-gap: .25em;
        }
        
        ul.weekdays li {
          font-size: 0;
        }
        
        ul.weekdays > li abbr:after {
            content: attr(title);
            font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
          text-align: center;
          }
      }
    `];
  }
}

window.customElements.define('monthly-calendar-events', MonthlyCalendarEventsElement)
