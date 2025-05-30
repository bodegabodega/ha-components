import { html, css } from 'lit';
import { BaseElement } from './base-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import { currentConditionsForState } from '../lib/current-conditions';
import { asAdjective } from '../lib/weather-condition';
import { hexForTemperature } from '../lib/temperature-color';
import { stringified } from '../lib/utilities/has-changed';
import { hostDisplayNone } from '../lib/utilities/dom';

export class CurrentConditionsElement extends BaseElement {
  static get properties() {
    return {
      _conditions: { state: true, hasChanged: stringified }
    }
  }
  static getDefaults() {
    return {
      size: "medium",
      mode: ""
    }
  }
  constructor() {
    super('Calendar Events');
  }
  setConfig(config) {
    if (!config.entity) throw new Error("You need to define an entity");
    this.config = Object.assign(CurrentConditionsElement.getDefaults(), config);
  }
  validate() {
    this._conditions = currentConditionsForState(this.hass.states[this.config.entity]);
  }
  render() {
    const { current, low, high, unit, description, feelsLike } = this._conditions || {};
    return this.config && this._conditions && this.visibleToUser
      ? html`
      <div class="outer ${this.config.size} ${this.config.mode}">
        <div class="temperature">
          <span class="number" style=${styleMap({
              background: `linear-gradient(105deg, ${hexForTemperature(low)}, ${hexForTemperature(high)})`,
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent'
            })}>${current}</span><span class="degree">${this.config.unit || unit}</span>
        </div>
        <div class="condition">${asAdjective(description)}</div>
        <div class="feels-like">Feels like ${feelsLike}${this.config.unit || unit}</div>
        <div class="lowhigh">
          <div>${low}${this.config.unit || unit}</div>
          <div class="gauge">
            <div class="background" style=${styleMap({
              backgroundImage: `linear-gradient(90deg, ${hexForTemperature(low)}, ${hexForTemperature(high)})`
            })}></div>
            <div class="point" style=${styleMap({
              left: `${Math.round(((current - low) / (high - low)) * 95)}px` // 95 is a magic number because gauge is 100px and size of point is 5px .. could be better
            })}></div>
          </div>
          <div>${high}${this.config.unit || unit}</div>
        </div>
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
        justify-content: center;
        align-items: center;
      }
      .outer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 20px 0;
      }
      .temperature {
        margin: 0 auto;
      }
      .temperature .number {
        color: var(--color-text-primary);
        filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.5));

        display: inline-block;
        vertical-align: middle;
        padding-left: 20px;
      }
      .degree {
        color: var(--color-text-tertiary);

        font-weight: 400;
      }
      .condition {
        color: var(--color-text-primary);
        text-align: center;
      }
      .feels-like {
        color: var(--color-text-secondary);
        text-transform: uppercase;
      }
      .lowhigh {
        color: var(--color-text-secondary);

        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 6px;
      }
      .gauge {
        width: 100px;
      }
      .gauge .background {
        background-color: #666666;
        height: 3px;
        border-radius: 10px;
        position: relative;
        top: 45%
      }
      .gauge .point {
        position: relative;
        top: 25%;
        background-color: var(--color-fg);
        height: 5px;
        width: 5px;
        border-radius: 10px;
      }
      .outer.medium .temperature .number {
        font-size: 96px;
        line-height: 84px;
      }
      .outer.medium .degree {
        font-size: 54px;
      }
      .outer.medium .condition {
        font-size: 28px;
        line-height: 36px;
      }
      .outer.medium .feels-like {
        font-size: 22px;
        line-height: 30px;
      }
      .outer.large .temperature .number {
        font-size: 124px;
        line-height: 108px;
      }
      .outer.large .degree {
        font-size: 72px;
      }
      .outer.large .condition {
        font-size: 36px;
        line-height: 42px;
      }
      .outer.large .feels-like {
        font-size: 28px;
        line-height: 36px;
      }
      .outer.xlarge .temperature .number {
        font-size: 164px;
        line-height: 132px;
      }
      .outer.xlarge .degree {
        font-size: 86px;
      }
      .outer.xlarge .condition {
        font-size: 48px;
        line-height: 58px;
      }
      .outer.xlarge .feels-like {
        font-size: 36px;
        line-height: 36px;
      }
      .outer.xlarge .lowhigh {
        font-size: 24px;
      }

      .outer.xlarge .gauge .point {
        top: 33%;
      }
      .not-found {
        color: red;
      }
    `];
  }
}

window.customElements.define('current-conditions', CurrentConditionsElement)
