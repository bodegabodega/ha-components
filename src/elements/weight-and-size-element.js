import { html, css, nothing} from 'lit';
import { BaseElement } from './base-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import dayjs from 'dayjs';
import { stringified } from '../lib/utilities/has-changed';

export class WeightAndSizeElement extends BaseElement {
  static get properties() {
    return {
      weightAndSize: { state: true, hasChanged: stringified }
    }
  }
  static getDefaults() {
    return {
    }
  }

  setConfig(config) {
    if(!config.entity) throw new Error("You need to define an entity");
    this.config = Object.assign(WeightAndSizeElement.getDefaults(), config);
  }
  validate() {
    this.weightAndSize = hass.states[this.config.entity].attributes;
  }
  
  render() {
    this.log('Rendering?', !!(this.weightAndSize && this.visibleToUser));
    return this.weightAndSize && this.visibleToUser
      ? html`
      <div class="outer">
        <div class="weight">
          <div class="current">${this.weightAndSize.current}<span class="unit">lbs</span></div>
          <div class="goal">${Math.round(this.weightAndSize.current - this.weightAndSize.goal_weight)}<span class="to-goal"> lbs to goal</span</div>
        </div>
        <div class="details-container">
          <div class="detail">
            <div class="top-line">BMI</div>
            <div class="mid-line">${this.weightAndSize.bmi}</div>
            <div class="bottom-line">KG/M2</div>
          </div>
          <div class="detail">
            <div class="top-line">Body</div>
            <div class="mid-line">${this.weightAndSize.water}%</div>
            <div class="bottom-line">Water</div>
          </div>
          <div class="detail">
            <div class="top-line">Muscle</div>
            <div class="mid-line">${this.weightAndSize.muscle_mass}%</div>
            <div class="bottom-line">Mass</div>
          </div>
        </div>
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
        align-items: center;
      }
      .outer {
        margin-top: 8px;
        text-align: center;
        width: 100%;
      }
      .weight {
      }
      .weight .current {
        font-size: 72px;
        line-height: 32px;
        color: var(--color-text-primary);
      }
      .weight .unit {
        font-size: 36px;
        text-transform: uppercase;
        color: var(--color-text-secondary);
      }
      .weight .goal {
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;

        color: var(--color-text-secondary);
      }
      .weight .to-goal {
        color: var(--color-text-tertiary);
      }
      .details-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        margin-top: 20px;

        text-transform: uppercase;
        font-size: 18px;
        line-height: 12px;
        color: var(--color-text-primary);
      }
      .top-line, .bottom-line {
        color: var(--color-text-secondary);
      }
      .mid-line {
        font-size: 36px;
        line-height: 34px;
      }
    `];
  }
}

window.customElements.define('weight-and-size', WeightAndSizeElement)
