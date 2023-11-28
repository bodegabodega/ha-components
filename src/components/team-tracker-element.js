import { html, css, nothing} from 'lit';
import { styleMap } from 'lit-html/directives/style-map.js';
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
      this.matchup = forEntitiesFromState(this._config.entities, h);
    }
  }
  setConfig(config) {
    this._config = Object.assign(TeamTrackerElement.getDefaults(), config);
    this.log('Setting Config', this._config)
    if (!config.entities) throw new Error("You need to define entities");
    if (this._config.mode == 'development') {
      this._config.entities = ["sensor.arsenal_cl_team_tracker", "sensor.arsenal_team_tracker"];
      this.hass = sample;
    }
  }

  render() {
    this.log('Rendering?', !!this.matchup);
    return this.matchup
      ? html`
      <div class="outer">
        <div class="row">
          <div class="detail">${this.matchup.date}</div>
          <div class="detail">${this.matchup.league}</div>
        </div>
        <div class="row opponents">
          <div class="home" style=${styleMap({
              borderColor: `${this.matchup.home.color}`
            })}>
            <div>${this.matchup.home.abbreviation}</div>
            <div class="detail">${this.matchup.home.record}</div>
          </div>
          <div class="score">
            <div>${this.matchup.score}</div>
            <div class="detail">${this.matchup.clock}</div>
          </div>
          <div class="away" style=${styleMap({
              borderColor: `${this.matchup.away.color}`
            })}>
            <div>${this.matchup.away.abbreviation}</div>
            <div class="detail">${this.matchup.away.record}</div>
          </div>
        </div>
        <div class="details">
          <div class="detail">${this.matchup.location}</div>
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

        background-color: var(--color-bg-secondary);
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