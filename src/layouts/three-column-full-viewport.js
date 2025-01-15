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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap">
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