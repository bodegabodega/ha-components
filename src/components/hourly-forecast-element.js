import {LitElement, html, css} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import sun from './../assets/sun.svg?raw';

export class HourlyForecastElement extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    }
  }

  setConfig(config) {
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
        flex-direction: column;
        justify-content: center;

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
      .outer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }
      .feather {
        stroke: #ffffff;
        height: 16px;
        width: 16px;
      }
      .prediction {
        display: flex;
        flex-direction: column;
        align-items: center;
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

window.customElements.define('hourly-forecast', HourlyForecastElement)
