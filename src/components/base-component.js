import {LitElement, css} from 'lit';
import globals from '../globals.json';

export class BaseComponent extends LitElement {
  static get properties() {
    return {
      config: { type: Object }
    }
  }
  constructor() {
    super();

    console.log(`${this.constructor.name} ∙ ${globals.version}`)
    this._hass = undefined;
  }

  get isForUser() {
    let forUser = false;
    if(!this.config) {
      this.log('No config, so not for user');
    } else if(!this.config.users) {
      this.log('No users in config, so for user');
      forUser = true;
    } else if(this.config.users && !this.config.users.includes(this.hass.user.id)) {
      this.log('User not in config, so not for user');
    };
    return forUser;
    // return ((this.config && !this.config.users)) || (this.config && this.config.users && this.config.users.includes(this.hass.user.id));
  }

  set hass(hass) {
    this._hass = hass;
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