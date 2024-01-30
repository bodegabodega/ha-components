import { LitElement, html, css } from "lit";

export class TwoColumnFullViewport extends LitElement {
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
      const sidebar = [];
      const main = [];
      this._config.cards.forEach((card, index) => {
          const container = card.view_layout && card.view_layout.placement == 'sidebar' ? sidebar : main;
          container.push(this.cards[index]);
      });
      return html`
          <div class="sidebar">
              ${sidebar.map((card) => html`${card}`)}
          </div>
          <div class="column">
              ${main.map((card) => html`${card}`)}
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

customElements.define("two-column-full-viewport", TwoColumnFullViewport);