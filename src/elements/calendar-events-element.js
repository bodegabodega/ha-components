import { html, css, nothing} from 'lit';
import { forEntityFromState } from '../lib/calendar-events';
import { BaseElement } from './base-element';
import { stringified } from '../lib/utilities/has-changed';

export class CalendarEventsElement extends BaseElement {
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
    this.config = Object.assign(CalendarEventsElement.getDefaults(), config);
  }
  validate() {
    this._days = forEntityFromState(this.hass, this.config);
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
    : nothing;
  }

  render() {
    this.log('Rendering?', !!(this._days && this.visibleToUser));
    return this._days && this.visibleToUser
      ? this._days.map(day => this.getEventList(day.label, day.events))
      : this._days && this._days.length == 0
      ? nothing
      : nothing;
  }

  static get styles() {
    return [
      BaseElement.styles,
      css`
      :host {
        font-size: 18px;
      }
      .event-list-container {
        margin: 10px 10px 20px 10px;
      }
      h3 {
        margin: 0 0 3px 0;

        color: var(--color-text-secondary);
        font-size: 24px;
        text-transform: uppercase;
      }
      .event {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 10px;
        margin-bottom: 10px;

        background-color: var(--color-glass);

        border-radius: 8px;
      }
      .event.all-day {
        font-size: 12px;
        padding: 5px inherit;
        margin: 0;

        background: transparent;
        border: none;
      }
      .meridian, .unit {
        font-weight: 300;
      }
      .start-time, .duration {
        width: 15%;
      }
      .duration {
        text-align: right;
      }
      .details {
        width: 70%;
      }
      .location {
        font-size: 12px;
        font-weight: 300;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .not-found {
        font-size: .3em;
        color: red;
      }
    `];
  }
}

window.customElements.define('calendar-events', CalendarEventsElement)
