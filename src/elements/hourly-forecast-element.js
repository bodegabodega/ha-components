import { html, css, nothing } from 'lit';
import { BaseElement } from './base-element';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {forEntityFromState} from './../lib/hourly-forecast';

export class HourlyForecastElement extends BaseElement {
  static get properties() {
    return {
      config: { type: Object },
      forecast: { type: Array, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return {
      numPredictions: 7,
      includeSun: true
    }
  }
  set hass(h) {
    if (this._config && this._config.entity) {
      this.log('Getting Forecast from Entity State');
      this.forecast = forEntityFromState(h, this._config);
    }
  }
  setConfig(config) {
    this._config = Object.assign(HourlyForecastElement.getDefaults(), config);
    this.log('Setting Config', this._config)
    if (!config.entity) throw new Error("You need to define an entity");
  }

  render() {
    this.log('Rendering?', !!this.forecast);
    return this.forecast
      ? html`
      <div class="outer">
        ${this.forecast.map(i => html`
        <div class="prediction">
          <div class="hour">${unsafeHTML(i.hour)}</div>
          <div class="icon">${unsafeHTML(i.condition)}</div>
          <div class="temperature">${i.temperature}</div>
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
      }
      .outer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        margin: 10px 0;
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
        text-align: center;
        font-weight: 700;
        color: var(--color-text-secondary);
      }
      .icon {
        padding-bottom: 5px;
      }
      .hour {
        padding-bottom: 5px;
      }
      .temperature {
        color: var(--color-text-secondary);
        font-weight: 700;
        padding-bottom: 5px;
      }
      .precipitation-probability {
        color: var(--color-blue);
        font-size: 10px;
      }
      .not-found {
        text-align: center;
        font-size: 24px;
        color: #666666;
      }
    `];
  }
}

window.customElements.define('hourly-forecast', HourlyForecastElement)
