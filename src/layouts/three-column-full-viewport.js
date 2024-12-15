import { LitElement, html, css } from "lit";

export class ThreeColumnFullViewport extends LitElement {
  setConfig(config) {
      this._config = config;
  }
  static get properties() {
      return {
          cards: {type: Array, attribute: false}
      };
  }
  render() {
      if(!this.cards || !this._config) {
          return html``;
      }
      const containers = {
        sidebar: [],
        main: [],
        endbar: []
      }
      this._config.cards.forEach((card, index) => {
        if (card.view_layout) {
          const container = containers[card.view_layout.placement];
          if (container) {
            container.push(this.cards[index]);
          } else {
            console.error(`Invalid placement ${card.view_layout.placement}`);
          }
        }
      });
      return html`
          <div class="sidebar">
              ${sidebar.map((card) => html`${card}`)}
          </div>
          <div class="column">
              ${main.map((card) => html`${card}`)}
          </div>
          <div class="column">
              ${endbar.map((card) => html`${card}`)}
          </div>
      `
  }
  static get styles() {
      return css`
        :host {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 2fr;
        }
        .sidebar > * {
        }
        
        @media (min-width: 1024px) {
          .container {
            display: grid;
            grid-template-columns: 1fr 2fr;
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

customElements.define("two-column-full-viewport", ThreeColumnFullViewport);