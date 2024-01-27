import { html, css, nothing} from 'lit';
import { BaseElement } from './base-element';
import { forEntityFromState } from '../lib/quit-smoking-progress';
import { stringified } from '../lib/utilities/has-changed';

export class QuitSmokingElement extends BaseElement {
  static get properties() {
    return {
      _progress: { state: true, hasChanged: stringified }
    }
  }
  static getDefaults() {
    return {
    }
  }
  constructor() {
    super('Quit Smoking');
  }
  setConfig(config) {
    if(!config.entity) throw new Error("You need to define an entity");
    this.config = Object.assign(QuitSmokingElement.getDefaults(), config);
  }
  validate() {
    this._progress = forEntityFromState(this.config, this.hass);
  }
  render() {
    const { achievement, friendlyDaysWithout, moneySaved, skippedCigarettesCount, nextAchievement } = this._progress || {};
    this.log('Rendering?', !!(this._progress && this.visibleToUser));
    return this._progress && this.visibleToUser
      ? html`
      <div class="outer">
        <div class="current-achievement">${achievement}</div>
        <div class="days-without">${friendlyDaysWithout}<br />without a cigarette</div>
        <div>
        ${moneySaved
          ? html`${moneySaved} saved`
          : nothing
        }
        ${moneySaved && skippedCigarettesCount
          ? html` ∙ `
          : nothing
        }
        ${skippedCigarettesCount
          ? html`${skippedCigarettesCount} skipped cigarettes`
          : nothing
        }
        </div>
        <div class="next-achievement">${nextAchievement}</div>
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
