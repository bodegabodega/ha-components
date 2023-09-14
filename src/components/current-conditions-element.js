import {LitElement, html, css} from 'lit';
import sample from './../../data/hass.json';

export class CurrentConditionsElement extends LitElement {
  static get properties() {
    return {
      mode: { type: String },
      hass: { type: Object },
      config: { type: Object },
      unit: { type: String }
    }
  }
  static getStubConfig() {
    return {}
  }
  set mode(m) {
    if (m == 'development') {
      this.setConfig(Object.assign(CurrentConditionsElement.getStubConfig(), {
        mode: 'development',
        entity: "weather.forecast_garden_street"
      }))
      this.hass = sample;
    }
  }
  setConfig(config) {
    if (!config.entity && this.config.mode !== 'development') {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  render() {
    const entityState = this.hass.states[this.config.entity];
    return entityState
      ? html`
      <div class="outer">
        <span class="temperature">${entityState.attributes.temperature}</span><span class="degree">${this.unit || entityState.attributes.temperature_unit}</span>
      </div>
      `
      : html` <div class="not-found">Entity ${this.config.entity} not found.</div> `;
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
        font-weight: 400;
        
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }
      .outer {

      }
      .temperature {
        color: #ffffff;
        font-size: 124px;

        display: inline-block;
        vertical-align: middle;
        line-height: normal;
      }
      .degree {
        font-weight: 400;
        font-size: 68px;
        vertical-align: baseline;

        display: inline-block;
        line-height: normal;
      }
      .not-found {
        color: red;
      }
    `;
  }
}

window.customElements.define('current-conditions', CurrentConditionsElement)
