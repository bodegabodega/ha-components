import { html, css, nothing} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import { BaseComponent } from './base-component';
import {forEntityFromState} from './../lib/todos-progress';
import check from './../assets/check.svg?raw';

export class TodosProgressElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object },
      tasks: { type: Object, attribute: false, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return {
    }
  }
  set hass(h) {
    this._hass = h;
    this.log('Setting Hass', h)
    this.tasks = forEntityFromState(h, this.config);
  }
  setConfig(config) {
    this.config = Object.assign(TodosProgressElement.getDefaults(), config);
    this.log('Setting Config', this.config)
    if (!config.entity) throw new Error("You need to define a sensor entity");
  }

  render() {
    this.log('Rendering?', !!this.days);
    return this.tasks
      ? html`
        <div class="outer">
          <h3>TODO<span class="detail">${this.tasks.remaining} Remaining</span></h3>
          <div class="progress">
            <div class="background" />
            <div class="foreground" style=${styleMap({
              width: `${this.tasks.percentComplete}%`
            })} />
          </div>
          <div class="todo-list-container">
            ${this.tasks.tasks.map(task => html`
            <div class="todo${task.complete ? ' completed' : ''}">
              <div class="details">
                <div class="summary">${task.title}</div>
                <div class="list">${task.list}</div>
              </div>
              ${task.complete ?
                html`<div class="status"><div class="icon">${unsafeHTML(check)}</div></div>`
                : nothing
              }
              ${!task.complete && task.daysOverdue > 0 ?
                html`<div class="status">
                  <span class="top">Days</span>
                  <span class="middle">${task.daysOverdue}</span>
                  <span class="bottom">Overdue</span>
                </div>`
                : nothing
              }
            </div>
            `)}
            <div class="last-updated">Updated ${this.tasks.lastUpdated}</div>
          </div>
        </div>
      `
      : html` <h3>Nothing To Do</h3> `
  }

  static get styles() {
    return [
      BaseComponent.styles,
      css`
      :host {
        font-size: 18px;
      }
      .outer {
        margin: 10px;
      }
      h3 {
        margin: 0 0 3px 0;

        color: var(--color-text-secondary);
        font-size: 24px;
        text-transform: uppercase;
      }
      h3 .detail {
        margin-left: 10px;
        font-size: 15px;
        font-weight: 300;
      }
      .progress .background {
        border-bottom: 1px solid var(--color-text-tertiary);
        position: relative;
        height: 3px;
      }
      .progress .foreground {
        background-color: var(--color-text-primary);
        height: 7px;
        width: 80%;
      }
      .todo-list-container {
        margin: 20px 0;
      }
      .todo {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 10px;
        margin-bottom: 10px;

        background-color: var(--color-glass);

        border-radius: 8px;
      }
      .todo.completed .summary {
        color: var(--color-text-secondary);
      }
      .list {
        font-size: 12px;
        color: var(--color-text-secondary);
        text-transform: uppercase;
      }
      .status {
        font-size: 9px;
        text-transform: uppercase;
        text-align: center;
      }
      .status span {
        display: block;
      }
      .status .middle {
        font-size: 22px;
        line-height: 18px;
      }
      .status .icon {
        margin-right: 15px;
      }
      .last-updated {
        font-size: 12px;
        color: var(--color-text-tertiary);
        text-transform: uppercase;
      }
    `];
  }
}

window.customElements.define('todos-progress', TodosProgressElement)
