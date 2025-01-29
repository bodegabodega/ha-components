import { html, css } from 'lit';
import { BaseElement } from './base-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import { currentConditionsForState } from '../lib/current-conditions';
import { asAdjective } from '../lib/weather-condition';
import { hexForTemperature } from '../lib/temperature-color';
import { stringified } from '../lib/utilities/has-changed';
import { hostDisplayNone } from '../lib/utilities/dom';

export class TextLabelElement extends BaseElement {
  static get properties() {
    return {
      _text: { state: true }
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
    this.config = Object.assign(TextLabelElement.getDefaults(), config);
  }
  validate() {
    this._text = this.config.attribute
      ? this.hass.states[this.config.entity].attributes[this.config.attribute]
      : this.hass.states[this.config.entity].state;
  }
  render() {
    return this.config && this.visibleToUser
      ? html`
      <div class="outer ${this.config.size} ${this.config.mode}">
        ${this._text}
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
        padding: 20px;
        text-align: center;
      }
      .outer.small {
        font-size: 14px;
      }
      .outer.medium {
        font-size: 18px;
      }
      .outer.large {
        font-size: 24px;
      }
      .outer.xlarge {
        font-size: 36px;
      }
    `];
  }
}

window.customElements.define('text-label', TextLabelElement)
