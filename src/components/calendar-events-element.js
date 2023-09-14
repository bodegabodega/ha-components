import {LitElement, html, css, nothing} from 'lit';
import { getEvents } from '../lib/event-service';

export class CalendarEventsElement extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      mode: { type: String },
      events: { type: Object, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getStubConfig() {
    return {
      updateFrequency: 60 * 60 * 1000
    }
  }
  set mode(m) {
    if (m == 'development') {
      this.setConfig(Object.assign(CalendarEventsElement.getStubConfig(), {
        mode: 'development',
        updateFrequency: 1000
      }))
    }
  }
  set hass(h) {
    this._hass = h;
  }
  setConfig(config) {
    if (!config.entity && config.mode != 'development') {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }
  connectedCallback() {
    super.connectedCallback()
    this._interval = setInterval(this.updateState.bind(this), this.config.updateFrequency);
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    clearInterval(this._interval)
  }
  async updateState() {
    this.events = await getEvents(this._hass, this.config);
  }
  getEventList(label, events) {
    return events && events.length > 0
    ? html`
      <h3>${label}</h3>
        <div class="event-list">
        ${events.map(event => html`
        <div class="event">
        ${event.time
          ? html`
          <div>
            <span class="time">${event.time}</span><span class="meridian">${event.meridian}</span>
          </div>
          `
          : nothing
        }
          <div class="details">
            <div class="summary">${event.summary}</div>
            ${event.location
              ? html`
              <div class="location">${event.location}</div>
              `
              : nothing
            }
          </div>
          ${event.duration
            ? html`
            <div class="duration">
              <span class="hours">${event.duration}</span><span class="unit">${event.duration_unit}</span>
            </div>
            `
            : nothing
          }
        </div>
        `)}
        </div>
      `
    : nothing;
  }

  render() {
    return this.events
      ? html`${this.getEventList('Today', this.events.today)}${this.getEventList('Tomorrow', this.events.tomorrow)}`
      : html` <h3>No events found</h3> `;
  }

  static get styles() {
    return css`
      :host {
        padding: 10px;
        min-height: 150px;

        background-color: #FFFFFF;

        color: #666666;
        font-size: 18px;
        font-weight: 400;
        
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }
      h3 {
        margin: 0 0 10px 0;

        font-size: 24px;
        text-transform: uppercase;
      }
      .event {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 10px;
        margin-bottom: 10px;

        background-color: #f5f5f5;
        background-image: linear-gradient(172deg, #fafafa, #ffffff);
        border: 1px solid #ededed;
        filter: drop-shadow(5px 5px 6px #f5f5f5);

        border-radius: 8px;
      }
      .meridian, .unit {
        font-weight: 300;
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
    `;
  }
}

window.customElements.define('calendar-events', CalendarEventsElement)
