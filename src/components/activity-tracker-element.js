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
      activityItems: { type: Array, attribute: false, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return {
    }
  }
  setConfig(config) {
    this.config = Object.assign(ActivityTrackerElement.getDefaults(), config);
    if(!config.entities || config.entities.length == 0) throw new Error("You need to define at least one entity as `entities`");
    this.activityItems = [];
    this.config.entities.forEach(entity => {
      const { name, progress, goal } = entity;
      if(!name) throw new Error("You need to define a name for each activity");
      if(!progress) throw new Error("You need to define a progress entity for each activity");
      if(!goal) throw new Error("You need to define a goal entity for each activity");
      this.activityItems.push({
        id: (Math.random() + 1).toString(36).substring(7), // random enough
        name,
        progress,
        goal
      });
    })
  }
  gauge(hass) {
    return (item) => {
      const { id, progress, goal } = item;
      const value = hass.states[progress].state;
      const target = hass.states[goal].state;
      if(!item.gauge && this.shadowRoot && this.shadowRoot.getElementById(id)) {
        item.gauge = Gauge(this.shadowRoot.getElementById(id), {
          color: value => {
            return value < target ? 'var(--color-text-secondary)' : 'var(--color-success)';
          }
        });
      } else {
        return;
      }
      item.gauge.setMaxValue(Math.round(Math.max(target, value)));
      item.gauge.setValueAnimated(Math.round(value), 1);
    }
  }
  set hass(hass) {
    if(this.activityItems) {
      this.activityItems.forEach(this.gauge(hass));
    }
  }
  render() {
    return this.activityItems && this.activityItems.length > 0
      ? html`
        <div class="outer">
          <div class="activity">
            ${ this.activityItems.map(item => html`
              <div class="activity-item">
                <div id="${ item.id }" class="gauge-container"></div>
                <div class="activity-item-label">${ item.name }</div>
              </div>
            `)}
          </div>
        </div>`
      : nothing;
  }

  static get styles() {
    return [
      BaseComponent.styles,
      css`
      :host {
        display: flex;
        align-items: center;
      }
      .outer {
        width: 100%;
        text-align: center;
      }
      .activity {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 20px;
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
