import {LitElement, html, css} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {forEntityFromState} from './../lib/hourly-forecast';
import sample from './../../data/hass.json';

export class HourlyForecastElement extends LitElement {
  static get properties() {
    return {
      mode: { type: String },
      config: { type: Object },
      forecast: { type: Array, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getStubConfig() {
    return {
      numPredictions: 7
    }
  }
  static getDefaults() {
    return {
      numPredictions: 7
    }
  }
  set mode(m) {
    if (m == 'development') {
      this.setConfig(Object.assign(HourlyForecastElement.getStubConfig(), {
        mode: 'development',
        numPredictions: 7,
        entity: "weather.forecast_garden_street_hourly"
      }))
      this.hass = sample;
    }
  }
  set hass(h) {
    this._hass = h;
    if (this.config && this.config.entity) {
      this.forecast = forEntityFromState(this.config.entity, this._hass, this.config.numPredictions);
    }
  }
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = Object.assign(HourlyForecastElement.getDefaults(), config);
  }

  render() {
    return this.forecast
      ? html`
      <div class="outer">
        ${this.forecast.map(i => html`
        <div class="prediction">
          <div class="hour">${unsafeHTML(i.hour)}</div>
          <div class="icon">${unsafeHTML(i.condition)}</div>
          <div class="temperature">${i.temperature}°</div>
        </div>
        `)}
      </div>
      `
      : html` <div class="not-found">No forecast found.</div> `;
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
        font-weight: 400;
        
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
        font-weight: 700;
      }
      .not-found {
        text-align: center;
        font-size: 24px;
        color: #666666;
      }
    `;
  }
}

window.customElements.define('hourly-forecast', HourlyForecastElement)
