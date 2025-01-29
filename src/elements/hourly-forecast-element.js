import { html, css, nothing } from 'lit';
import { BaseElement } from './base-element';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {forEntityFromState} from './../lib/hourly-forecast';
import { stringified } from '../lib/utilities/has-changed';
import { hostDisplayNone } from '../lib/utilities/dom';

export class HourlyForecastElement extends BaseElement {
  static get properties() {
    return {
      _forecast: { state: true, hasChanged: stringified}
    }
  }
  static getDefaults() {
    return {
      numPredictions: 7,
      includeSun: true,
      size: 'medium',
      mode: ''
    }
  }
  constructor() {
    super('Hourly Forecast');
  }
  setConfig(config) {
    if (!config.entity) throw new Error("You need to define an entity");
    this.config = Object.assign(HourlyForecastElement.getDefaults(), config);
  }
  validate() {
    this.log('Getting Forecast from Entity State');
    this._forecast = forEntityFromState(this.hass, this.config);
  }
  render() {
    this.log('Rendering?', !!(this._forecast && this.visibleToUser));
    return this.config && this._forecast && this.visibleToUser
      ? html`
      <div class="outer ${this.config.size} ${this.config.mode}">
        ${this._forecast.map(i => html`
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
      : hostDisplayNone;
  }

  static get styles() {
    return [
      BaseElement.styles,
      css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .outer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        margin: 10px 0;
      }
      .outer.small {
        font-size: 10px;
      }
      .outer.medium {
        font-size: 12px;
      }
      .outer.large {
        font-size: 16px;
      }
      .outer.xlarge {
        font-size: 20px;
      }
      .feather {
        stroke: var(--color-text-primary);
        height: 16px;
        width: 16px;
      }
      .outer.large .feather {
        height: 20px;
        width: 20px;
      }
      .outer.xlarge .feather {
        height: 24px;
        width: 24px;
      }
      .prediction {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-weight: 700;
        color: var(--color-text-secondary);
      }
      .outer.large .prediction,
      .outer.xlarge .prediction,
      .outer.large .temperature,
      .outer.xlarge .temperature {
        font-weight: 500;
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
      }
      .outer.small .precipitation-probability,
      .outer.medium .precipitation-probability {
        font-size: 10px;
      }
      .outer.large .precipitation-probability {
        font-size: 14px;
      }
      .outer.xlarge .precipitation-probability {
        font-size: 18px;
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
