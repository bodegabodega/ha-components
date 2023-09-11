import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import dayjs from 'dayjs';

@customElement('date-and-time')
export class DateAndTimeElement extends LitElement {
  @state()
  private _date:String = '';

  @state()
  private _time:String = '';

  @state()
  private _meridian:String = '';

  private _interval:ReturnType<typeof setInterval> | undefined;

  connectedCallback() {
    super.connectedCallback()
    this._interval = setInterval(this.updateState.bind(this), 1000)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    clearInterval(this._interval)
  }

  updateState() {
    const [d, t, m] = dayjs().format('dddd, MMMM D|h:mm|a').split('|');
    this._date = d;
    this._time = t;
    this._meridian = m;
  }

  setConfig(config:any) {
    console.log(config);
  }

  set hass(hass:any) {
    console.log(hass);
  }

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
        display: flex;
        justify-content: center;
        align-items: center;

        min-height: 150px;

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
