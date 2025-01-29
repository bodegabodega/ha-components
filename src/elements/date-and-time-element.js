import { html, css } from 'lit';
import { BaseElement } from './base-element';
import dayjs from 'dayjs';
import { hostDisplayNone } from '../lib/utilities/dom';

export class DateAndTimeElement extends BaseElement {
  static get properties() {
    return {
      _date: { type: String, state: true },
      _time: { type: String, state: true },
      _meridian: { type: String, state: true }
    }
  }
  static getDefaults() {
    return {
      format: "dddd, MMMM D|h:mm|a",
      size: "medium",
      mode: ""
    }
  }
  constructor() {
    super('Date and Time');
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
    if (!this.config) return
    const [d, t, m] = dayjs().format(this.config.format).split('|');
    this._date = d;
    this._time = t;
    this._meridian = m;
  }
  setConfig(config) {
    this.config = Object.assign(DateAndTimeElement.getDefaults(), config);
    this.updateState();
  }
  render() {
    return this.config && this.visibleToUser ? html`
    <div class="outer ${this.config.size} ${this.config.mode}">
      <div class="date">${this._date}</div>
      <div class="time">${this._time}<span class="meridian">${this._meridian}</span></div>
    </div>
    `
    : hostDisplayNone;
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
        font-weight: 700;
        text-transform: uppercase;
      }
      .time {
        color: var(--color-text-primary);

        display: inline-block;
      }
      .meridian {
        color: var(--color-text-tertiary);
        font-weight: 300;
        text-transform: uppercase;

        display: inline-block;
      }
      .outer.small .date {
        font-size: 10px;
      }
      .outer.small .time {
        font-size: 40px;
        line-height: 36px;
      }
      .outer.medium .date {
        font-size: 12px;
      }
      .outer.medium .time {
        font-size: 48px;
        line-height: 40px;
      }
      .outer.large .date {
        font-size: 16px;
      }
      .outer.large .time {
        font-size: 62px;
        line-height: 48px;
      }
      .outer.xlarge .date {
        font-size: 24px;
      }
      .outer.xlarge .time {
        font-size: 84px;
        line-height: 64px;
      }
    `];
  }
}

window.customElements.define('date-and-time', DateAndTimeElement)
