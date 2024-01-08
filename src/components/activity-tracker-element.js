import { html, css, nothing } from 'lit';
import { BaseComponent } from './base-component';
import Gauge from 'svg-gauge';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export class ActivityTrackerElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object },
      updatedAt: { type: String, attribute: false }
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
    if(!gauge && this.shadowRoot.getElementById(name)) {
      gauge = Gauge(this.shadowRoot.getElementById(name), {
        color: value => {
          return value < goal ? 'var(--color-text-secondary)' : 'var(--color-success)';
        }
      });
      this.gauges.set(name, gauge);
    } else {
      return;
    }
    gauge.setMaxValue(Math.round(Math.max(goal, value)));
    gauge.setValueAnimated(Math.round(value), 1);
  }
  set hass(hass) {
    if(this.config && this.config.entity && hass.states && hass.states[this.config.entity]) {
      const entity = hass.states[this.config.entity];
      const { energy, exercise, steps, energy_goal, exercise_goal, step_goal } = entity.attributes;
      this.gauge('energy', energy, energy_goal);
      this.gauge('exercise', exercise, exercise_goal);
      this.gauge('steps', steps, step_goal);

      const updatedDate = dayjs(entity.state);
      this.updatedAt = updatedDate.fromNow();
    }
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
        <div class="updated-at">${ this.updatedAt || "Loading" }</div>
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
        margin: 0 auto;
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
      .updated-at {
        font-size: 12px;
        
        color: var(--color-text-tertiary);
        text-transform: uppercase;
      }
    `];
  }
}

window.customElements.define('activity-tracker', ActivityTrackerElement)
