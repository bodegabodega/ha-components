import { css } from 'lit';
import { BaseElement } from './base-element';

export class ViewCyclerElement extends BaseElement {
  constructor() {
    super('View Cycler');
    this._mode = ViewCyclerElement.modes.UNKOWN;
    this._viewIndex = -1;
  }
  static get properties() {
    return {
    }
  }
  static get modes() {
    return {
      UNKOWN: 'unknown',
      ENTITY_TRACKING: 'entity-tracking',
      DELAY: 'delay',
      DISABLED: 'disabled'
    }
  }
  static getDefaults() {
    return {
    }
  }
  get mode() {
    return this._mode;
  }
  set mode(mode) {
    if(this._mode != mode) {
      // handle the change
      this.log(`Mode changed from '${this._mode}' to '${mode}'`);
      if( mode == ViewCyclerElement.modes.ENTITY_TRACKING ) {
        this._entityState = sessionStorage.getItem(`view-cycler-${this.config.entity}`);
        this.log(`Entity state from sessionStrorage: '${this.entityState}'`);
      } else if( mode == ViewCyclerElement.modes.DELAY ) {
        this._delay = this.config.delay;
        this.log(`Delay from config: '${this._delay}'`);

        window.__view_cycler_interval__ = setInterval(this.considerCycle.bind(this), 1000);
        window.__view_cycler_last__ = Date.now();
        window.addEventListener("focus", this.onFocus.bind(this));
      }
      if( this._mode == ViewCyclerElement.modes.DELAY ) {
        this.log(`Clearing interval and removing event listener cause no longer ${this._mode} mode.`)
        if (window.__view_cycler_interval__) clearInterval(window.__view_cycler_interval__);
        window.removeEventListener("focus", this.onFocus.bind(this));
      }
    }
    this._mode = mode;
  }
  getSelectedViewIndex() {
    let index = -1;
    const n = this.views.length;
    for (let i = 0; i < n; i++) {
      const element = this.views[i];
      if(element.getAttribute("aria-selected") === "true") {
        index = i;
        break;
      }
    }
    return index;
  }
  setConfig(config) {
    if(!config.entity && !config.delay) throw new Error("You need to define an entity or delay");
    if(config.entity && config.delay) throw new Error("You can't define both an entity and a delay");
    this.config = Object.assign(ViewCyclerElement.getDefaults(), config);
    this.mode = (this.config.entity) ? ViewCyclerElement.modes.ENTITY_TRACKING : ViewCyclerElement.modes.DELAY;
    this._viewIndex = this.getSelectedViewIndex();
    this.log(`View index from DOM: ${this._viewIndex}`);
  }
  get views() {
    if(!this._views) {
      try {
        this._views = document.querySelector('home-assistant').shadowRoot
                .querySelector('home-assistant-main').shadowRoot
                .querySelector('ha-panel-lovelace').shadowRoot
                .querySelector('hui-root').shadowRoot
                .querySelectorAll('paper-tab');
      } catch (error) {
        return [];
      }
    }
    return this._views;
  }
  set viewIndex(index) {
    if(this.views && this.views[index]) {
      this.log(`Switching to view: ${index}`);
      this.views[index].click();
    }
    this._viewIndex = index;
  }
  get viewIndex() {
    return this._viewIndex;
  }
  set entityState(state) {
    this._entityState = state;
    sessionStorage.setItem(`view-cycler-${this.config.entity}`, state);
  }
  get entityState() {
    return this._entityState;
  }
  validate() {
    if(!this.visibleToUser) {
      this.mode = ViewCyclerElement.modes.DISABLED;
    } else if(this.mode == ViewCyclerElement.modes.ENTITY_TRACKING) {
      const incomingState = this.hass.states[this.config.entity].state;
      if(this.entityState == null) {
        this.log(`Entity state not set. Setting to ${incomingState} and returning.`)
        this.entityState = incomingState;
        return;
      }
      if(incomingState !== this.entityState) {
        this.log(`Entity state changed: was '${this.entityState}' now '${incomingState}'`)
        const asNumber = parseInt(incomingState);
        if(!isNaN(asNumber) && (asNumber >= 0 && asNumber < this.views.length)) {
          this.log(`Entity is number in view count bounds. Setting view index to ${asNumber}`)
          this.viewIndex = asNumber;
        } else {
          this.log(`Entity is not number in view count bounds. Cycling view index.`)
          this.doCycle();
        }
        this.entityState = incomingState;
      } else {
        this.log(`Entity state not changed: '${this.entityState}'`)
      }
    }
  }
  considerCycle() {
    const now = Date.now();
    const diff = now - window.__view_cycler_last__;
    if(diff > (this._delay * 1000)) {
      this.log(`Delay has passed. Cycling view index.`)
      this.doCycle();
      window.__view_cycler_last__ = now;
    }
  }
  doCycle() {
    if(!this.views || this.views.length <= 1) return;
    this.viewIndex = ( this.viewIndex == this.views.length - 1 ) ? 0 : this.viewIndex + 1;
  }
  onFocus() {
    window.__view_cycler_last__ = Date.now();
  }

  static get styles() {
    return css`
      :host {
        display: none;
      }
    `;
  }
}

window.customElements.define('view-cycler', ViewCyclerElement)
