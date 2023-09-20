import { html, css} from 'lit';
import { BaseComponent } from './base-component';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import {forEntityFromState} from '../lib/daily-forecast';
import sample from '../../data/hass.json';

export class DailyForecastElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object },
      forecast: { type: Array, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return { }
  }
  // set mode(m) {
  //   if (m == 'development') {
  //     this.setConfig(Object.assign(DailyForecastElement.getStubConfig(), {
  //       mode: 'development',
  //       numPredictions: 7,
  //       entity: "weather.forecast_garden_street"
  //     }))
  //     this.hass = sample;
  //   }
  // }
  set config(config) {
    this.setConfig(config);
  }
  set hass(h) {
    if (this._config && this._config.entity) {
      this.log('Getting Forecast from Entity State');
      this.forecast = forEntityFromState(this._config.entity, h);
    }
  }
  setConfig(config) {
    this._config = Object.assign(DailyForecastElement.getDefaults(), config);
    this.log('Setting Config', this._config)
    if (!config.entity) throw new Error("You need to define an entity");
    if (this._config.mode == 'development') this.hass = sample;
  }
  render() {
    this.log('Rendering?', !!this.forecast);
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
        margin: 0 !important;
        display: flex;
        flex-direction: column;
        justify-content: center;

        min-height: 200px;

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
