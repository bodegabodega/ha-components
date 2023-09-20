import { html, css} from 'lit';
import { BaseComponent } from './base-component';
import dayjs from 'dayjs';

export class DateAndTimeElement extends BaseComponent {
  static get properties() {
    return {
      _date: { type: String, state: true },
      _time: { type: String, state: true },
      _meridian: { type: String, state: true }
    }
  }
  static getDefaults() {
    return {}
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
    this.config = Object.assign(DateAndTimeElement.getDefaults(), config);
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
    return css`
      :host {
        margin: 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;

        min-height: 180px;

        background-color: #111111;

        font-weight: 400;
        
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }
      .outer {

      }
      .date {
        color: #666666;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .time {
        font-size: 72px;
        line-height: 64px;
        color: #ffffff;

        display: inline-block;
      }
      .meridian {
        color: #666666;
        font-weight: 300;
        text-transform: uppercase;

        display: inline-block;
      }
    `;
  }
}

window.customElements.define('date-and-time', DateAndTimeElement)
