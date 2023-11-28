import {LitElement, css} from 'lit';

export class BaseComponent extends LitElement {
  log() {
    if(this._config && !this._config.debug) { return };
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
      }
    }
    :host {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      background-color: var(--color-bg);
      color: var(--color-fg);
      
      font-weight: 400;

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }
  `;
}