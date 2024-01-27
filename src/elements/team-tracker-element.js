import { html, css, nothing} from 'lit';
import { styleMap } from 'lit-html/directives/style-map.js';
import { BaseElement } from './base-element';
import { stringified } from '../lib/utilities/has-changed';
import { forEntitiesFromState } from '../lib/matchup';

export class TeamTrackerElement extends BaseElement {
  static get properties() {
    return {
      _matchup: { state: true, hasChanged: stringified }
    }
  }
  static getDefaults() {
    return {
      spoilers: true
    }
  }
  constructor() {
    super('Team Tracker');
  }
  validate() {
    this.log('Getting Matchup for Entities State');
    this._matchup = forEntitiesFromState(this.config, this.hass);
  }
  setConfig(config) {
    if (!config.entities) throw new Error("You need to define entities");
    this.config = Object.assign(TeamTrackerElement.getDefaults(), config);
  }
  render() {
    this.log('Rendering?', !!(this._matchup && this.visibleToUser));
    return this._matchup && this.visibleToUser
      ? html`
      <div class="outer">
        <div class="row">
          <div class="detail">${this._matchup.date}</div>
          <div class="detail">${this._matchup.league}</div>
        </div>
        <div class="row opponents">
          <div class="home" style=${styleMap({
              borderColor: `${this._matchup.home.color}`
            })}>
            <div>${this._matchup.home.abbreviation}</div>
            <div class="detail">${this._matchup.home.record}</div>
          </div>
          <div class="score">
            <div>${this._matchup.score}</div>
            <div class="detail">${this._matchup.clock}</div>
          </div>
          <div class="away" style=${styleMap({
              borderColor: `${this._matchup.away.color}`
            })}>
            <div>${this._matchup.away.abbreviation}</div>
            <div class="detail">${this._matchup.away.record}</div>
          </div>
        </div>
        <div class="details">
          <div class="detail">${this._matchup.location}</div>
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

        color: var(--color-text-primary);
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