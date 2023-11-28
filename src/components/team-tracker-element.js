import { html, css, nothing} from 'lit';
import { BaseComponent } from './base-component';
import {forEntitiesFromState} from './../lib/matchup';
import sample from './../../data/hass.json';

export class TeamTrackerElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object },
      matchup: { type: Object, attribute: false }
    }
  }
  static getDefaults() {
    return {
      
    }
  }
  set config(config) {
    this.setConfig(config);
  }
  set hass(h) {
    if (this._config && this._config.entities) {
      this.log('Getting Matchup for Entities State');
      this.matchup = forEntitiesFromState(this._config.entity, h);
    }
  }
  setConfig(config) {
    this._config = Object.assign(TeamTrackerElement.getDefaults(), config);
    this.log('Setting Config', this._config)
    if (!config.entities) throw new Error("You need to define entities");
    if (this._config.mode == 'development') this.hass = sample;
  }

  render() {
    this.log('Rendering?', !!this.matchup);
    return this.matchup
      ? html`
      <div class="outer">
        <div class="row">
          <div class="detail">Dec 2 &bull; 3:00PM</div>
          <div class="detail">EPL</div>
        </div>
        <div class="row opponents">
          <div class="home">
            <div>ARS</div>
            <div class="detail">9 &bull; 3 &bull; 1</div>
          </div>
          <div class="score">
            <div>2 &bull; 1</div>
            <div class="detail">FT</div>
          </div>
          <div class="away">
            <div>WOL</div>
            <div class="detail">4 &bull; 3 &bull; 5</div>
          </div>
        </div>
        <div class="details">
          <div class="detail">Emirates Stadium &bull; London, England</div>
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
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .outer {
        margin: 10px;
      }
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        margin: 5px 0;
      }
      .opponents {
        font-size: 48px;
        line-height: 32px;
      }
      .opponents > div {
        padding-top: 12px;
        padding-bottom: 2px;
      }
      .home {
        border-left: 5px solid #ef0107;
        padding-left: 8px;
      }
      .away {
        text-align: right;
        border-right: 5px solid #dfff00;
        padding-right: 8px;
      }
      .score {
        text-align: center;
      }
      .details > .detail {
        text-align: center;
      }
      .detail {
        font-size: 16px;
        text-transform: uppercase;
        color: var(--color-text-secondary);
      }
    `];
  }
}

window.customElements.define('team-tracker', TeamTrackerElement)