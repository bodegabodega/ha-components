import {LitElement, css} from 'lit';
import globals from '../globals.json';
import { stringified } from '../lib/utilities/has-changed';
import flattenConfig from '../lib/utilities/flatten-config';
import log from 'loglevel';
import randomEnough from '../lib/utilities/random-enough';

export class BaseElement extends LitElement {
  static get properties() {
    return {
      config: { state: true, hasChanged: stringified }
    }
  }
  constructor(name) {
    super();

    this._name = name || this.constructor.name;

    this.initialise();
  }
  get trace() { return this._trace; }
  get debug() { return this._debug; }
  get info() { return this._info; }
  get log() { return this._log; }
  get warn() { return this._warn; }
  get error() { return this._error; }

  get visibleToUser() {
    return this.config ? this.config.visibleToUser : true;
  }
  set config(value) {
    this._config = flattenConfig(value, this.hass);
    const lvl = this._config.debug == true ? log.levels.TRACE : log.levels.WARN;
    this._logger.setLevel(lvl, false);
    this.log('Actualized Config:', this._config)
  }
  get config() {
    return this._config;
  }
  set hass(hass) {
    const wasnt = (this._hass == undefined);
    this._hass = hass;
    if(wasnt) this.config = this._config;
    if(this.config) this.validate();
  }
  get hass() {
    return this._hass;
  }
  validate() {
    // Override this method to validate possible state changes
  }

  static styles = css`
    :host {
      font-family: 'Montserrat', sans-serif;

      --color-bg: hsl(0, 0%, 98%);
      --color-bg-secondary: hsl(0, 0%, 95%);
      --color-fg: hsl(0, 0%, 7%);
      --color-fg-secondary: hsl(0, 0%, 10%);

      --color-text-primary: hsl(0, 0%, 40%);
      --color-text-secondary: hsl(0, 0%, 50%);
      --color-text-tertiary: hsl(0, 0%, 80%);
      
      --color-glass: rgba(200, 200, 200, 0.2);;

      --color-blue: #189aba;
      --color-success: #089c08;
    }
    @media (prefers-color-scheme: dark) {
      :host {
        --color-bg: hsl(0, 0%, 7%);
        --color-bg-secondary: hsl(0, 0%, 10%);
        --color-fg: hsl(0, 0%, 98%);
        --color-fg-secondary: hsl(0, 0%, 95%);

        --color-text-primary: hsl(0, 0%, 98%);
        --color-text-secondary: hsl(0, 0%, 50%);
        --color-text-tertiary: hsl(0, 0%, 40%);

        --color-glass: rgba(100, 100, 100, 0.2)
      }
    }
    :host .dark {
      --color-bg: hsl(0, 0%, 7%);
      --color-bg-secondary: hsl(0, 0%, 10%);
      --color-fg: hsl(0, 0%, 98%);
      --color-fg-secondary: hsl(0, 0%, 95%);

      --color-text-primary: hsl(0, 0%, 98%);
      --color-text-secondary: hsl(0, 0%, 50%);
      --color-text-tertiary: hsl(0, 0%, 40%);

      --color-glass: rgba(100, 100, 100, 0.2)
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
  level(fn) {
    return (...args) => {
      const arg = [this._name, ...args]
      fn.apply(null, arg);
    }
  }
  initialise() {
    console.log()
    this._logger = log.getLogger(randomEnough());

    this._trace = this.level(this._logger.trace);
    this._debug = this.level(this._logger.debug);
    this._log = this.level(this._logger.info);
    this._info = this.level(this._logger.info);
    this._warn = this.level(this._logger.warn);
    this._error = this.level(this._logger.error);

    this.info(`${this._name} ∙ ${globals.version}`)
  }

}