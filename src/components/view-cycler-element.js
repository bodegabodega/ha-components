import { css } from 'lit';
import { BaseComponent } from './base-component';

export class ViewCyclerElement extends BaseComponent {
  constructor() {
    super();
    this._viewIndex = -1;
    this._entityState = undefined;
    this._delay = undefined;
    this._interval = undefined;
    this._lastCycle = undefined;
    this._setHass = () => {};
  }
  static get properties() {
    return {
      config: { type: Object }
    }
  }
  static getDefaults() {
    return {
      "users": []
    }
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
    this.config = Object.assign(ViewCyclerElement.getDefaults(), config);
    if(!this.config.entity && !this.config.delay) throw new Error("You need to define an entity or delay");
    if(this.config.entity && this.config.delay) throw new Error("You can't define both an entity and a delay");
    if(this.config.entity) {
      this._entityState = sessionStorage.getItem(`view-cycler-${this.config.entity}`);
      this.log(`Entity state from sessionStrorage: '${this.entityState}'`);
      this._setHass = this.entityStateTracker.bind(this);
    } else {
      this._delay = this.config.delay;
      this.log(`Delay from config: '${this._delay}'`);
      if (this._interval) clearInterval(this._interval);
      this._interval = setInterval(this.considerCycle.bind(this), 1000);
      this._lastCycle = Date.now();
      window.addEventListener("focus", this.onFocus.bind(this));
    }
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
  set hass(hass) {
    if(this.config && (this.config.users.length == 0 || this.config.users.includes(hass.user.name))) {
      this._setHass(hass);
    } else {
      this.log(`No config or user '${hass.user.name}' not in list of allowed users: ${this.config.users}`)
    }
  }
  entityStateTracker(hass) {
    const incomingState = hass.states[this.config.entity].state;
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
        this.viewIndex = this.viewIndex == this.views.length - 1 ? 0 : this.viewIndex + 1;
      }
      this.entityState = incomingState;
    } else {
      this.log(`Entity state not changed: '${this.entityState}'`)
    }
  }
  considerCycle() {
    const now = Date.now();
    const diff = now - this._lastCycle;
    if(diff > (this._delay * 1000)) {
      this.log(`Delay has passed. Cycling view index.`)
      this.viewIndex = this.viewIndex == this.views.length - 1 ? 0 : this.viewIndex + 1;
      this._lastCycle = now;
    }
  }
  onFocus() {
    this._lastCycle = Date.now();
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
