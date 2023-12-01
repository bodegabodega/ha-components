import { html, css, nothing} from 'lit';
import { getDays } from '../lib/event-service';
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
      updateFrequency: 60 * 60 * 1000,
      dayLookahead: 7
    }
  }
  set config(config) {
    this.setConfig(config);
  }
  set hass(h) {
    this._hass = h;
    this.log('Setting Hass', h)
    if (!this._lastUpdate || (Date.now() - this._lastUpdate) > this._config.updateFrequency) {
      this.log('Requesting State Update')
      this.updateState().then(() => { /* do nothing */ });
    }
  }
  constructor() {
    super();
    this._lastUpdate = null;
  }
  connectedCallback() {
    super.connectedCallback()
    if( this._config.mode == "development" ) {
      this.hass = {};
    }
  }
  setConfig(config) {
    this._config = Object.assign(CalendarEventsElement.getDefaults(), config);
    this.log('Setting Config', this._config)
    if (!config.entities) throw new Error("You need to define at least one entity");
  }
  async updateState() {
    if(!this._hass || !this._config) return;
    this.log('Updating State') 
    this.days = await getDays(this._hass, this._config);
    this._lastUpdate = Date.now();
    this.log('Received State', this.days);
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
      : !this._lastUpdate
      ? html` <h3>Loading</h3> `
      : html` <h3>No upcoming events</h3> `;
  }

  static get styles() {
    return [
      BaseComponent.styles,
      css`
      :host {
        font-size: 18px;
      }
      .event-list-container {
        margin: 10px 10px 15px 10px;
      }
      h3 {
        margin: 0 0 10px 0;

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

        background-image: var(--color-glass-gradient);
        border: 1px solid var(--color-glass-stroke);
        filter: drop-shadow(5px 5px 6px var(--color-bg));

        border-radius: 8px;
      }
      .event.all-day {
        font-size: 12px;
        padding: 5px inherit;
        margin-bottom: 3px;

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
