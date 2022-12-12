import { DomListener } from "./DOMListener.js";

export class CrmComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.queryApi = options.queryApi;
  }

  toHTML() {
    return "html";
  }

  // метод, вызывающий инициализацию событий
  init() {
    this.initDOMListeners();
  }

  // метод, вызывающий удаление событий
  destroy() {
    this.removeDOMlisteners();
  }
}
