import {LitElement, html, css} from 'lit';

export class CurrentConditionsElement extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      unit: { type: String }
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  render() {
    const entityState = this.hass && this.hass.states ? this.hass.states[this.config.entity] : undefined;
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
        font-weight: 300;
        font-size: 48px;
        vertical-align: super;

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
