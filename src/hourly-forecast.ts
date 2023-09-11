import {LitElement, html, css} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {customElement, property} from 'lit/decorators.js';
import sun from './assets/sun.svg?raw';

@customElement('hourly-forecast')
export class HourlyForecastElement extends LitElement {
  @property({ type: Object })
  hass:any = {};

  @property({ type: Object })
  config:any = {};

  setConfig(config:any) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  render() {
    console.log(this.hass)
    console.log(this.config)
    const entityState = this.hass && this.hass.states ? this.hass.states[this.config.entity] : undefined;
    // return entityState
    //   ? html`
    //   <div class="outer">

    //   </div>
    //   `
    //   : html` <div class="not-found">Entity ${this.config.entity} not found.</div> `;
    return html`
    <div class="outer">
      <div class="prediction">
        <div class="hour">NOW</div>
        <div class="icon">${unsafeHTML(sun)}</div>
        <div class="temperature">78</div>
      </div>

      <div class="prediction">
        <div class="hour">&nbsp;</div>
        <div class="icon">${unsafeHTML(sun)}</div>
        <div class="temperature">78</div>
      </div>
      <div class="prediction">
        <div class="hour">2</div>
        <div class="icon">${unsafeHTML(sun)}</div>
        <div class="temperature">78</div>
      </div>
      <div class="prediction">
        <div class="hour">&nbsp;</div>
        <div class="icon">${unsafeHTML(sun)}</div>
        <div class="temperature">78</div>
      </div>
      <div class="prediction">
        <div class="hour">4</div>
        <div class="icon">${unsafeHTML(sun)}</div>
        <div class="temperature">78</div>
      </div>
      <div class="prediction">
        <div class="hour">&nbsp;</div>
        <div class="icon">${unsafeHTML(sun)}</div>
        <div class="temperature">78</div>
      </div>
      <div class="prediction">
        <div class="hour">6</div>
        <div class="icon">${unsafeHTML(sun)}</div>
        <div class="temperature">78</div>
      </div>
    </div>
    `
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;

        min-height: 150px;

        background-color: #111111;

        color: #666666;
        font-size: 12px;
        font-weight: 700;
        
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }
      .feather {
        stroke: #ffffff;
        height: 16px;
        width: 16px;
      }
      .outer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .prediction {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 5px;
      }
      .icon {
        padding-bottom: 5px;
      }
      .hour {
        text-align: center;
        padding-bottom: 5px;
      }
      .temperature {
        text-align: center;
      }
      .not-found {
        font-size: .3em;
        color: red;
      }
    `;
  }
}
