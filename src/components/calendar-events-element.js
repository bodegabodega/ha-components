import { html, css, nothing} from 'lit';
import { forEntityFromState } from '../lib/calendar-events';
import { BaseComponent } from './base-component';

export class CalendarEventsElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object },
      days: { type: Object, attribute: false, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return {
    }
  }
  set hass(h) {
    this._hass = h;
    this.log('Setting Hass', h)
    this.days = forEntityFromState(h, this.config);
  }
  constructor() {
    super();
    this._lastUpdate = null;
    this._service = null;
  }
  setConfig(config) {
    this.config = Object.assign(CalendarEventsElement.getDefaults(), config);
    this.log('Setting Config', this.config)
    if (!config.entity) throw new Error("You need to define a sensor entity");
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
    this.log('Rendering?', !!this.days);
    return this.days
      ? this.days.map(day => this.getEventList(day.label, day.events))
      : this.days && this.days.length == 0
      ? html` <h3>No upcoming events</h3> `
      : html` <h3>INITIALIZING</h3> `;
  }

  static get styles() {
    return [
      BaseComponent.styles,
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

        border-bottom: 1px solid var(--color-glass);
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
