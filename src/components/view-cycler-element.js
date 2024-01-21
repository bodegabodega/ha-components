import { css } from 'lit';
import { BaseComponent } from './base-component';

export class ViewCyclerElement extends BaseComponent {
  constructor() {
    super();
    this._viewIndex = -1;
    this.entityState = undefined;
  }
  static get properties() {
    return {
      config: { type: Object }
    }
  }
  static getDefaults() {
    return {
    }
  }

  setConfig(config) {
    this.config = Object.assign(ViewCyclerElement.getDefaults(), config);
    if(!config.entity) throw new Error("You need to define an entity");
    this.entityState = undefined;
  }
  get views() {
    this.log('Getting views')
    this.log(this._views)
    if(!this._views) {
      const homeAssistant = document.querySelector('home-assistant');
      const root = homeAssistant.shadowRoot.querySelector('home-assistant-main').shadowRoot;
      const sidebarRoot = root.querySelector('ha-sidebar').shadowRoot;
      const sidebarListbox = sidebarRoot.querySelector('paper-listbox');
      const panel = root.querySelector('ha-panel-lovelace')
      // const root = this.dig([
      //   ['home-assistant', true],
      //   ['home-assistant-main', true]
      // ]);
      // const panel = root.querySelector('ha-panel-lovelace')
      if(panel == document) { return []; }
      const uiRoot = panel.shadowRoot.querySelector('hui-root')
      if(!uiRoot) { return []; }
      const isEditing = uiRoot.shadowRoot.querySelector('.edit-mode');
      if(isEditing) { return []; }
      let tabs = uiRoot.shadowRoot.querySelector('ha-tabs');
      if(!tabs) {
        tabs = uiRoot.shadowRoot.querySelector('paper-tabs');
      }
      this._views = tabs.querySelectorAll('paper-tab');
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
  set hass(hass) {
    if(this.config) {
      const incomingState = hass.states[this.config.entity].state;
      if(incomingState !== this.entityState) {
        this.log(`Entity state changed: was '${this.entityState}' now '${incomingState}'`)
        const asNumber = parseInt(incomingState);
        if(!isNaN(asNumber) && (asNumber >= 0 && asNumber < this.views.length)) {
          this.log(`Entity is number in view count bounds. Setting view index to ${asNumber}`)
          this.viewIndex = asNumber;
        } else {
          this.log(`Entity is not number in view count bounds. Cycling view index.`)
          this.viewIndex = this.viewIndex > this.views.length - 1 ? 0 : this.viewIndex + 1;
        }
        this.entityState = incomingState;
      } else {
        this.log(`Entity state not changed: '${this.entityState}'`)
      }
    }
  }
  dig(query, root = document) {
    return query.reduce(
      (accumulator, [selector, shadow]) => {
        const node = accumulator.querySelector(selector);
        return !node ? accumulator : shadow ? node.shadowRoot : node;
      },
      root
    );
  }
  
  // render() {
  //   return nothing;
  // }

  static get styles() {
    return css`
      :host {
        display: none;
      }
    `;
  }
}

window.customElements.define('view-cycler', ViewCyclerElement)
