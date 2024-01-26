import {LitElement, css} from 'lit';
import globals from '../globals.json';
import { stringified } from '../lib/utilities/has-changed';
import flattenConfig from '../lib/utilities/flatten-config';

export class BaseElement extends LitElement {
  static get properties() {
    return {
      config: { state: true, hasChanged: stringified }
    }
  }
  constructor() {
    super();

    console.log(`${this.constructor.name} ∙ ${globals.version}`)
  }
  get visibleToUser() {
    return this.config ? this.config.visibleToUser : true;
  }
  set config(value) {
    const was = this._config;
    this._config = flattenConfig(value, this.hass);
    this.requestUpdate('config', was);
  }
  get config() {
    return this._config;
  }
  set hass(hass) {
    this._hass = hass;
    if(this.config) this.validate();
  }
  get hass() {
    return this._hass;
  }
  validate() {
    // Override this method to validate possible state changes
  }
  log() {
    if(this.config && !this.config.debug) { return };
    const args = [this.constructor.name, ...arguments]
    console.log.apply(null, args);
  }

  static styles = css`
    :host {
      --color-bg: hsl(0, 0%, 7%);
      --color-bg-secondary: hsl(0, 0%, 10%);
      --color-fg: hsl(0, 0%, 98%);
      --color-fg-secondary: hsl(0, 0%, 95%);

      --color-text-primary: hsl(0, 0%, 98%);
      --color-text-secondary: hsl(0, 0%, 50%);
      --color-text-tertiary: hsl(0, 0%, 40%);

      --color-success: #089c08;

      --color-glass: rgba(100, 100, 100, 0.2);

      --color-blue: #189aba;
    }
    @media (prefers-color-scheme: light) {
      :host {
        --color-bg: hsl(0, 0%, 98%);
        --color-bg-secondary: hsl(0, 0%, 95%);
        --color-fg: hsl(0, 0%, 7%);
        --color-fg-secondary: hsl(0, 0%, 10%);

        --color-text-primary: hsl(0, 0%, 40%);
        --color-text-secondary: hsl(0, 0%, 50%);
        --color-text-tertiary: hsl(0, 0%, 80%);

        --color-glass: rgba(200, 200, 200, 0.2);
      }
    }
    :host {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      color: var(--color-fg);
      
      font-weight: 400;

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }
    .not-found {
      font-size: 16px;
      color: red;
    }
  `;
}