import { html, css, nothing } from 'lit';
import { BaseElement } from './base-element';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import {forEntityFromState} from '../lib/daily-forecast';

export class DailyForecastElement extends BaseElement {
  static get properties() {
    return {
      config: { type: Object },
      forecast: { type: Array, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return { }
  }
  set hass(h) {
    if (this.config && this.config.entity) {
      this.log('Getting Forecast from Entity State');
      this.forecast = forEntityFromState(this.config.entity, h);
    }
  }
  setConfig(config) {
    this.config = Object.assign(DailyForecastElement.getDefaults(), config);
    this.log('Setting Config', this.config)
    if (!config.entity) throw new Error("You need to define an entity");
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
            ${i.precipitationProbability > 0
              ? html`<div class="precipitation-probability">${i.precipitationProbability}%</div>`
              : nothing
            }
          </div>
        `)}
      </div>
      `
      : html` <div class="not-found">No forecast found.</div> `;
  }

  static get styles() {
    return [
      BaseElement.styles,
      css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;

        font-size: 12px;
        font-weight: 400;
      }
      .outer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 14px 0;
      }
      .feather {
        stroke: var(--color-text-primary);
        height: 16px;
        width: 16px;
      }
      .prediction {
        display: flex;
        flex-direction: column;
        align-items: center;

        color: var(--color-text-secondary);
        text-align: center;
        font-weight: 700;
      }
      .day {
        text-align: center;
        padding-bottom: 5px;
      }
      .temperature {
        background-color: var(--color-text-tertiary);
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
        padding-bottom: 5px;
      }
      .low {
        padding-top: 5px;
      }
      .precipitation-probability {
        color: var(--color-blue);
        font-size: 10px;
      }
      .not-found {
        font-size: 24px;
        color: #666666;
        text-align: center;
      }
    `];
  }
}

window.customElements.define('daily-forecast', DailyForecastElement)
