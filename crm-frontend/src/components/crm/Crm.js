import { $ } from "../../core/dom.js";
import { Emitter } from "../../core/Emitter.js";

export class Crm {
  constructor(selector, options) {
    this.$el = document.getElementById(selector);
    this.components = options.components || [];
    this.emitter = new Emitter()
  }

  // метод инициализации компонентов
  getRoot() {
    const $root = $.create("div", "crm");

    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      // DEBUG
      // if (component.name) {
      //   window["c" + component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  // метод создания стартового dom
  render() {
    // создаем dom-структуру
    this.$el.append(this.getRoot().$el);

    // инициализируем события
    this.components.forEach((component) => {
      component.init();
      component.connectEmitter()
    });
  }
}
