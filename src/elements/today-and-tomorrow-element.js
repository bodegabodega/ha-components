import { html, css, nothing} from 'lit';
import { forEntityFromState } from '../lib/calendar-events';
import { BaseElement } from './base-element';
import { stringified } from '../lib/utilities/has-changed';
import { hostDisplayNone } from '../lib/utilities/dom';

export class TodayAndTomorrowElement extends BaseElement {
  static get properties() {
    return {
      _days: { state: true, hasChanged: stringified }
    }
  }
  static getDefaults() {
    return {
      "mode": ""
    }
  }
  constructor() {
    super('Calendar Events');
  }
  setConfig(config) {
    if (!config.entity) throw new Error("You need to define a sensor entity");
    this.config = Object.assign(TodayAndTomorrowElement.getDefaults(), config);
  }
  validate() {
    const allDays = forEntityFromState(this.hass, this.config);
    this._days = Array.isArray(allDays) ? allDays.filter(day => !!day).splice(0, 2) : allDays;
  }
  getEventList(label, events) {
    return events && events.length > 0
    ? html`
      <div class="event-list-container ${this.config.mode}">
        <h3>${label}</h3>
          <div class="event-list">
          ${events.map(event => html`
            <div class="event${event.isAllDay ? ' all-day' : ''}">
              <div class="details">
                <div class="summary">${event.summary}</div>
              </div>
              <div class="duration">
                ${event.startTime
                  ? html`<span class="time">${event.startTime}</span><span class="meridian">${event.startMeridian}</span>`
                  : nothing
                }
                ${event.duration && event.isAllDay
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
        font-size: 36px;
        line-height: normal;
      }
      .event-list-container {
        margin: 20px 10px 20px 10px;
      }
      h3 {
        margin: 0 0 20px 0;

        color: var(--color-text-secondary);
        font-size: 24px;
        font-weight: normal;
        text-transform: uppercase;
      }
      .event {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 20px 10px;
        margin-bottom: 20px;

        background-color: var(--color-glass);
        backdrop-filter: blur(8px);

        border-radius: 8px;
      }
      .summary {
        color: var(--color-text-primary);
      }
      .meridian, .unit {
        font-weight: 300;
      }
      .start-time, .duration {
        width: 15%;
      }
      .duration {
        font-size: 24px;
        text-align: right;
      }
      .details {
        width: 70%;
      }
      .not-found {
        font-size: .3em;
        color: red;
      }
    `];
  }
}

window.customElements.define('today-and-tomorrow', TodayAndTomorrowElement)
