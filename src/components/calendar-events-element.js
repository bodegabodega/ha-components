import { html, css, nothing} from 'lit';
import { getEvents } from '../lib/event-service';
import { BaseComponent } from './base-component';

export class CalendarEventsElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object },
      events: { type: Object, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return {
      updateFrequency: 60 * 60 * 1000
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
    if (!config.entity) throw new Error("You need to define an entity");
  }
  async updateState() {
    if(!this._hass || !this._config) return;
    this.log('Updating State') 
    this.events = await getEvents(this._hass, this._config);
    this._lastUpdate = Date.now();
    this.log('Received State', this.events);
  }
  getEventList(label, events) {
    return events && events.length > 0
    ? html`
      <div class="event-list-container">
        <h3>${label}</h3>
          <div class="event-list">
          ${events.map(event => html`
          <div class="event">
            <div class="start-time">
            ${event.time
              ? html`
                <span class="time">${event.time}</span><span class="meridian">${event.meridian}</span>
              `
              : nothing
            }
            </div>
            <div class="details">
              <div class="summary">${event.summary}</div>
              ${event.location
                ? html`
                <div class="location">${event.location}</div>
                `
                : nothing
              }
            </div>
            <div class="duration">
              ${event.duration
                ? html`
                  <span class="hours">${event.duration}</span><span class="unit">${event.duration_unit}</span>
                `
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
    this.log('Rendering?', !!this.events);
    return this.events
      ? html`${this.getEventList('Today', this.events.today)}${this.getEventList('Tomorrow', this.events.tomorrow)}`
      : html` <h3>No events found</h3> `;
  }

  static get styles() {
    return [
      BaseComponent.styles,
      css`
      :host {
        font-size: 18px;

        background-color: var(--color-bg-secondary);
      }
      .event-list-container {
        padding: 10px;
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

        background-color: var(--color-bg-secondary);
        background-image: linear-gradient(172deg, var(--color-bg), var(--color-bg-secondary));
        border: 1px solid var(--color-bg);
        filter: drop-shadow(5px 5px 6px var(--color-bg));

        border-radius: 8px;
      }
      .meridian, .unit {
        font-weight: 300;
      }
      .start-time, .duration {
        width: 7%;
      }
      .duration {
        text-align: right;
      }
      .details {
        width: 75%;
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
