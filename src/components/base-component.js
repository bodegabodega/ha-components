import {LitElement} from 'lit';

export class BaseComponent extends LitElement {
  log() {
    if(this._config && !this._config.debug) { return };
    const args = [this.constructor.name, ...arguments]
    console.log.apply(null, args);
  }
}