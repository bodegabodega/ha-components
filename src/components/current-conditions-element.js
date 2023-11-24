import { html, css} from 'lit';
import { BaseComponent } from './base-component';
import { styleMap } from 'lit-html/directives/style-map.js';
import { currentConditionsForState } from '../lib/current-conditions';
import { asAdjective } from '../lib/weather-condition';
import { hexForTemperature } from '../lib/temperature-color';
import sample from './../../data/hass.json';

export class CurrentConditionsElement extends BaseComponent {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    }
  }
  static getDefaults() {
    return {}
  }
  set config(config) {
    this.setConfig(config);
  }
  setConfig(config) {
    this._config = Object.assign(CurrentConditionsElement.getDefaults(), config);
    this.log('Setting Config', this._config)
    if (!config.entity) throw new Error("You need to define an entity");
    if (this._config.mode == 'development') this.hass = sample;
  }
  render() {
    const entityState = this.hass.states[this._config.entity];
    const { current, low, high, unit, description } = currentConditionsForState(entityState);
    const currentPercentage = Math.round(((current - low) / (high - low)) * 95); // 95 is a magic number because gauge is 100px and size of point is 5px .. could be better
    return entityState
      ? html`
      <div class="outer">
        <div class="temperature">
          <span class="number">${current}</span><span class="degree">${this._config.unit || unit}</span>
        </div>
        <div class="condition">${asAdjective(description)}</div>
        <div class="lowhigh">
          <div>${low}°</div>
          <div class="gauge">
            <div class="background" style=${styleMap({
              backgroundImage: `linear-gradient(90deg, ${hexForTemperature(low)}, ${hexForTemperature(high)})`
            })}></div>
            <div class="point" style=${styleMap({
              left: `${currentPercentage}px`
            })}></div>
          </div>
          <div>${high}°</div>
        </div>
      </div>
      `
      : html` <div class="not-found">Entity ${this._config.entity} not found.</div> `;
  }

  static get styles() {
    return [
      BaseComponent.styles,
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
        font-size: 96px;

        display: inline-block;
        vertical-align: middle;
        line-height: 84px;
      }
      .degree {
        color: var(--color-text-tertiary);

        font-weight: 400;
        font-size: 54px;
        vertical-align: baseline;

        display: inline-block;
        line-height: normal;
      }
      .condition {
        font-size: 28px;
        line-height: 36px;
        color: var(--color-text-primary);
        text-align: center;
      }
      .lowhigh {
        color: var(--color-text-secondary);

        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 8px;
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
      .not-found {
        color: red;
      }
    `];
  }
}

window.customElements.define('current-conditions', CurrentConditionsElement)
