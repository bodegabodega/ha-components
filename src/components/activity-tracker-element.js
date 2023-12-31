import { html, css, nothing} from 'lit';
import { BaseComponent } from './base-component';
import Gauge from 'svg-gauge';
import { styleMap } from 'lit-html/directives/style-map.js';
import dayjs from 'dayjs';

export class ActivityTrackerElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object }
    }
  }
  static getDefaults() {
    return {
    }
  }

  setConfig(config) {
    this.config = Object.assign(ActivityTrackerElement.getDefaults(), config);
    if(!config.entity) throw new Error("You need to define an entity");
  }
  set hass(hass) {
    if(this.config && this.config.entity) {
      //this.weightAndSize = hass.states[this.config.entity].attributes;
      if(hass.states[this.config.entity]) {
        const { energy, exercise, steps } = hass.states[this.config.entity].attributes;
        if(this.energyGauge) this.energyGauge.setValueAnimated(Math.round(energy), 1);
        if(this.exerciseGauge) this.exerciseGauge.setValueAnimated(Math.round(exercise), 1);
        if(this.stepsGauge) this.stepsGauge.setValueAnimated(Math.round(steps), 1);
      }
    }
  }
  firstUpdated() {
    this.log('First Updated');

    this.log(this.config)
    this.exerciseGauge = Gauge(this.shadowRoot.getElementById("exercise"), {
      max: this.config.exercise_goal
    });
    this.energyGauge = Gauge(this.shadowRoot.getElementById("energy"), {
      max: this.config.energy_goal
    });
    this.stepsGauge = Gauge(this.shadowRoot.getElementById("steps"), {
      max: this.config.step_goal
    });
  }
  render() {
    //this.log('Rendering?', !!this.activity);
    //return this.activity
    return true
      ? html`
      <div class="outer">
        <div class="activity">
          <div class="activity-item">
            <div id="exercise" class="gauge-container"></div>
            <div class="activity-item-label">Exercise</div>
          </div>
          <div class="activity-item">
            <div id="energy" class="gauge-container"></div>
            <div class="activity-item-label">Energy</div>
          </div>
          <div class="activity-item">
            <div id="steps" class="gauge-container"></div>
            <div class="activity-item-label">Steps</div>
          </div>
        </div>
      </div>
      `
      : nothing;
  }

  static get styles() {
    return [
      BaseComponent.styles,
      css`
      :host {

      }
      .outer {
        margin: 40px 0 20px 0;
        text-align: center;
      }
      .activity {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 10px;
      }
      .gauge-container {
        width: 100px;
        height: 100px;
        display: block;
      }
      .gauge-container > .gauge .dial {
        stroke: var(--color-text-tertiary);
        stroke-width: 1;
        fill: rgba(0,0,0,0);
      }
      .gauge-container > .gauge .value {
        stroke: var(--color-text-primary);
        stroke-width: 5;
        fill: rgba(0,0,0,0);
      }
      .gauge-container > .gauge .value-text {
        fill: var(--color-text-primary);
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
      }
      .activity-item-label {
        margin-top: -15px;

        color: var(--color-text-secondary);
        text-transform: uppercase;
      }
    `];
  }
}

window.customElements.define('activity-tracker', ActivityTrackerElement)
