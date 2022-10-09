import { capitalize } from "./utils.js";

export class DomListener {
  constructor($root, listeners = []) {
    // если в дом нет корневого элемента
    if (!$root) {
      throw new Error("Нет корневого элемента дома");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  // метод инициализации событий
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || "";
        throw new Error(`Метод ${method} отсутствует в ${name} компоненте`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  // метод удаления событий
  removeDOMlisteners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

// маленькая вспомогательная функция, которая добавляет 'on' к имени события
function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
