import { html, css, nothing} from 'lit';
import { BaseElement } from './base-element';
import { forEntityFromState } from '../lib/quit-smoking-progress';
import { styleMap } from 'lit-html/directives/style-map.js';
import dayjs from 'dayjs';

export class QuitSmokingElement extends BaseElement {
  static get properties() {
    return {
      config: { type: Object },
      progress: { type: Object, attribute: false, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return {
    }
  }

  setConfig(config) {
    this.config = Object.assign(QuitSmokingElement.getDefaults(), config);
    if(!config.entity) throw new Error("You need to define an entity");
  }
  set hass(hass) {
    if(this.config) {
      this.progress = forEntityFromState(this.config, hass);
    }
  }
  
  render() {
    this.log('Rendering?', !!this.progress);
    return this.progress
      ? html`
      <div class="outer">
        <div class="current-achievement">${this.progress.achievement}</div>
        <div class="days-without">${this.progress.friendlyDaysWithout}<br />without a cigarette</div>
        <div>
        ${this.progress.moneySaved
          ? html`${this.progress.moneySaved} saved`
          : nothing
        }
        ${this.progress.moneySaved && this.progress.skippedCigarettesCount
          ? html` ∙ `
          : nothing
        }
        ${this.progress.skippedCigarettesCount
          ? html`${this.progress.skippedCigarettesCount} skipped cigarettes`
          : nothing
        }
        </div>
        <div class="next-achievement">${this.progress.nextAchievement}</div>
      </div>
      `
      : nothing;
  }

  static get styles() {
    return [
      BaseElement.styles,
      css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .outer {
        margin: 10px 0;
        width: 80%;

        text-align: center;
        text-transform: uppercase;
      }
      .current-achievement {
        font-size: 18px;
        color: var(--color-text-secondary);
      }
      .days-without {
        font-size: 36px;
        line-height: 32px;
        color: var(--color-text-primary);
      }
      .next-achievement {
        font-size: 14px;
        line-height: 16px;
        color: var(--color-text-secondary);

        margin-top: 5px;
      }
    `];
  }
}

window.customElements.define('quit-smoking', QuitSmokingElement)
