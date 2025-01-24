import { html, css } from "lit";
import { BaseElement } from './../elements/base-element';

export class ThreeColumnFullViewport extends BaseElement {
  static get properties() {
      return {
          _cards: {type: Array, attribute: false},
          _backgroundImageUrl: {type: String, state: true}
      };
  }
  static getDefaults() {
    return {
    }
  }
  setConfig(config) {
    this.config = Object.assign(ThreeColumnFullViewport.getDefaults(), config);
  }
  validate() {
    const entityName = this.config.backgroundImageEntityName;
    const states = this.hass.states;
    if(entityName && states[entityName]) {
      this._backgroundImageUrl = states[entityName];
    }
  }
  render() {
    if(!this._cards || !this.config) {
        return html``;
    }
    const containers = {
      sidebar: [],
      main: [],
      endbar: []
    }
    this.config._cards.forEach((card, index) => {
      if (card.view_layout) {
        const container = containers[card.view_layout.placement];
        if (container) {
          container.push(this._cards[index]);
        } else {
          console.error(`Invalid placement ${card.view_layout.placement}`);
        }
      }
    });
    const backgroundImage = this._backgroundImageUrl ? `<img class="background-image" src="${this._backgroundImageUrl}" />` : "";
    return html`
      ${backgroundImage}
      <div class="sidebar">
          ${containers.sidebar.map((card) => html`${card}`)}
      </div>
      <div class="column">
          ${containers.main.map((card) => html`${card}`)}
      </div>
      <div class="column">
          ${containers.endbar.map((card) => html`${card}`)}
      </div>
    `
  }
  static get styles() {
      return css`
        :host {
          margin: 1%;
          padding: 0;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          column-gap: 1%;
        }
        .sidebar > * {
        }
        .background-image {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -1;
          object-fit: cover;
        }
        @media (min-width: 1024px) {
          .container {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
          }          
          .sidebar {
            height: 100vh;
            display: grid;
            place-items: stretch;
          }
          .column {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            overflow: scroll;
          }
          .column > * {
            flex-grow: 1;
          }
        }`
  }
}

customElements.define("three-column-full-viewport", ThreeColumnFullViewport);