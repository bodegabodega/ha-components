import { LitElement, html, css } from "lit";

class TwoColumnFullViewport extends LitElement {
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
      console.log(this.cards[0].placement)
      //return html`${this.cards.map((card) => html`<div>${card}</div>`)}`;
      return html`
          <div class="sidebar">
              ${sidebar.map((card) => html`<div>${card}</div>`)}
          </div>
          <div class="main">
              ${main.map((card) => html`<div>${card}</div>`)}
          </div>
      `
  }
  static get styles() {
      return css`
          :host {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              height: 100vh;
              display: grid;
              grid-template-columns: 1fr 2fr;
          }
          .sidebar {
              display: grid;
              place-items: stretch;
          }
          .main {
              display: flex;
              flex-direction: column;
              justify-content: center;
          }
          .main > * {
              flex-grow: 1;
          }
      `
  }
}

customElements.define("two-column-full-viewport", TwoColumnFullViewport);