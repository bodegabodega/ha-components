import { html, css } from 'lit';
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
  constructor() {
    super();

    this.hasDom = false;
    this.gauges = new Map();
  }
  setConfig(config) {
    this.config = Object.assign(ActivityTrackerElement.getDefaults(), config);
    if(!config.entity) throw new Error("You need to define an entity");
  }
  gauge(name, value, goal) {
    let gauge = this.gauges.get(name);
    if(!gauge) {
      gauge = Gauge(this.shadowRoot.getElementById(name), {
        color: value => {
          return value < goal ? 'var(--color-text-secondary)' : 'var(--color-success)';
        }
      });
      this.gauges.set(name, gauge);
    }
    gauge.setMaxValue(Math.round(Math.max(goal, value)));
    gauge.setValueAnimated(Math.round(value), 1);
  }
  set hass(hass) {
    if(this.config && this.config.entity && hass.states && hass.states[this.config.entity] && this.hasDom ) {
      const { energy, exercise, steps, energy_goal, exercise_goal, step_goal } = hass.states[this.config.entity].attributes;
      this.gauge('energy', energy, energy_goal);
      this.gauge('exercise', exercise, exercise_goal);
      this.gauge('steps', steps, step_goal);
    }
  }
  firstUpdated() {
    this.hasDom = true;
    // this.log('First Updated');
    // this.exerciseGauge = Gauge(this.shadowRoot.getElementById("exercise"));
    // this.energyGauge = Gauge(this.shadowRoot.getElementById("energy"));
    // this.stepsGauge = Gauge(this.shadowRoot.getElementById("steps"));
  }
  render() {
    return html`
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
      `;
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
