import { html, css, nothing} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import check from './../assets/check.svg?raw';
import { BaseComponent } from './base-component';

export class TodosProgressElement extends BaseComponent {
  static get properties() {
    return {
      config: { type: Object },
      todos: { type: Object, attribute: false, hasChanged: (n, o) => { return JSON.stringify(n) !== JSON.stringify(o) }}
    }
  }
  static getDefaults() {
    return {
    }
  }
  set hass(h) {
    this._hass = h;
    this.log('Setting Hass', h)
    // this.days = forEntityFromState(h, this.config);
  }
  setConfig(config) {
    this.config = Object.assign(TodosProgressElement.getDefaults(), config);
    this.log('Setting Config', this.config)
    if (!config.entity) throw new Error("You need to define a sensor entity");
  }

  render() {
    this.log('Rendering?', !!this.days);
    // return this.todos
    return true
      ? html`
        <div class="outer">
          <h3>TODO<span class="detail">3 Remaining</span></h3>
          <div class="progress">
            <div class="background" />
            <div class="foreground" />
          </div>
          <div class="todo-list-container">
            <div class="todo">
              <div class="details">
                <div class="summary">Buy Groceries</div>
                <div class="list">Personal</div>
              </div>
              <div class="status">
                <span class="top">Days</span>
                <span class="middle">2</span>
                <span class="bottom">Overdue</span>
              </div>
            </div>
            <div class="todo">
              <div class="details">
                <div class="summary">Do something really long to see how it wraps when it need to wrap but really does it ever get this long not really.</div>
                <div class="list">Showtime</div>
              </div>
              <div class="status">
              </div>
            </div>
            <div class="todo completed">
              <div class="details">
                <div class="summary">This one is completed</div>
                <div class="list">Showtime</div>
              </div>
              <div class="status">
                <div class="icon">${unsafeHTML(check)}</div>
              </div>
            </div>
          </div>
        </div>
      `
      : html` <h3>No upcoming events</h3> `
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
        border-bottom: 1px solid var(--color-text-secondary);
        position: relative;
        height: 3px;
      }
      .progress .foreground {
        background-color: var(--color-text-tertiary);
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
    `];
  }
}

window.customElements.define('todos-progress', TodosProgressElement)
