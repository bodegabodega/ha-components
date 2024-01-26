import { html, css} from 'lit';
import { BaseElement } from './base-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import dayjs from 'dayjs';

export class DateAndTimeElement extends BaseElement {
  static get properties() {
    return {
      config: { type: Object },
      _date: { type: String, state: true },
      _time: { type: String, state: true },
      _meridian: { type: String, state: true }
    }
  }
  static getDefaults() {
    return {
    }
  }
  set config(config) {
    this.setConfig(config);
  }

  connectedCallback() {
    this.log('Connected Callback')
    super.connectedCallback()
    if (this._interval) clearInterval(this._interval);
    this._interval = setInterval(this.updateState.bind(this), 1000)
    this.updateState();
  }

  disconnectedCallback() {
    this.log('Disconnected Callback')
    super.disconnectedCallback()
    clearInterval(this._interval)
  }

  updateState() {
    this.log('Updating State')
    const [d, t, m] = dayjs().format('dddd, MMMM D|h:mm|a').split('|');
    this._date = d;
    this._time = t;
    this._meridian = m;
  }

  setConfig(config) {
    this._config = Object.assign(DateAndTimeElement.getDefaults(), config);
  }
  set hass(hass) {}

  render() {
    return html`
    <div class="outer">
      <div class="date">${this._date}</div>
      <div class="time">${this._time}<span class="meridian">${this._meridian}</span></div>
    </div>
    `;
  }

  static get styles() {
    return [
      BaseElement.styles,
      css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .outer {
        margin: 20px 0 10px 0;
      }
      .date {
        color: var(--color-text-secondary);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .time {
        font-size: 48px;
        line-height: 40px;
        color: var(--color-text-primary);

        display: inline-block;
      }
      .meridian {
        color: var(--color-text-tertiary);
        font-weight: 300;
        text-transform: uppercase;

        display: inline-block;
      }
    `];
  }
}

window.customElements.define('date-and-time', DateAndTimeElement)
