import { LitElement, html, css } from "lit";

export class ThreeColumnFullViewport extends LitElement {
  static getDefaults() {
    return {
      "mode": ""
    }
  }
  setConfig(config) {
    this.config = Object.assign(ThreeColumnFullViewport.getDefaults(), config);
  }
  static get properties() {
      return {
          cards: {type: Array, attribute: false}
      };
  }
  render() {
      if(!this.cards || !this.config) {
          return html``;
      }
      const containers = {
        sidebar: [],
        main: [],
        endbar: []
      }
      this.config.cards.forEach((card, index) => {
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
        <div class="${this.config.mode}">
          <div class="sidebar">
              ${containers.sidebar.map((card) => html`${card}`)}
          </div>
          <div class="column">
              ${containers.main.map((card) => html`${card}`)}
          </div>
          <div class="column">
              ${containers.endbar.map((card) => html`${card}`)}
          </div>
        </div>
      `
  }
  static get styles() {
      return css`
        :host {
          --color-bg: hsl(0, 0%, 98%);
        }
        @media (prefers-color-scheme: dark) {
          :host {
            --color-bg: hsl(0, 0%, 7%);
          }
        }
        :host .dark {
          --color-bg: hsl(0, 0%, 7%);
        }
        :host {
          margin: 1%;
          padding: 0;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          column-gap: 1%;

          background-color: var(--color-bg);
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