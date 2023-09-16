import {LitElement, html, css} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import {forEntityFromState} from '../lib/daily-forecast';
import sample from '../../data/hass.json';

export class DailyForecastElement extends LitElement {
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
      this.setConfig(Object.assign(DailyForecastElement.getStubConfig(), {
        mode: 'development',
        numPredictions: 7,
        entity: "weather.forecast_garden_street"
      }))
      this.hass = sample;
    }
  }

  set hass(h) {
    this._hass = h;
    if (this.config && this.config.entity) {
      this.forecast = forEntityFromState(this.config.entity, this._hass);
    }
  }
  setConfig(config) {
    if (!config.entity && config.mode != 'development') {
      throw new Error("You need to define an entity");
    }
    this.config = Object.assign(DailyForecastElement.getDefaults(), config);
  }
  render() {
    return this.forecast
      ? html`
      <div class="outer">
        ${this.forecast.map(i => html`
          <div class="prediction">            
            <div class="day">${i.day}</div>
            <div class="high">${i.high}°</div>
            <div class="temperature">
              <div class="range" style=${styleMap({
                top: `${i.offset}px`,
                height: `${i.height}px`,
                backgroundImage: `linear-gradient(0deg, ${i.lowHex}, ${i.highHex})`
              })}></div>
            </div>
            <div class="low">${i.low}°</div>
            <div class="icon">${unsafeHTML(i.condition)}</div>
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
      .day {
        text-align: center;
        padding-bottom: 5px;
      }
      .temperature {
        background-color: #666666;
        border-radius: 20px;
        width: 7px;
        height: 80px;
      }
      .range {
        position: relative;
        background-color: darkblue;
        width: 7px;
        border-radius: 20px;
      }      
      .high,
      .low {
        text-align: center;
        font-weight: 700;
        padding-bottom: 5px;
      }
      .low {
        padding-top: 5px;
      }
      .not-found {
        font-size: 24px;
        color: #666666;
        text-align: center;
      }
    `;
  }
}

window.customElements.define('daily-forecast', DailyForecastElement)
