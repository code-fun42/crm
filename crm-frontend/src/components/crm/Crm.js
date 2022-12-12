import { $ } from "../../core/dom.js";
import { Emitter } from "../../core/Emitter.js";
import { QueryApi } from "../../core/QueryApi.js";
import { ValidationForm } from "../../core/ValidationForm.js";

export class Crm {
  constructor(selector, options) {
    this.$el = document.getElementById(selector);
    this.components = options.components || [];
    this.emitter = new Emitter()
    this.queryApi = new QueryApi()
    this.validationForm = new ValidationForm()
  }

  // метод инициализации компонентов
  getRoot() {
    const $root = $.create("div", "crm");

    const componentOptions = {
      emitter: this.emitter,
      queryApi: this.queryApi,
      validationForm: this.validationForm,
    }

    // const optionsHeader = {
    //   queryApi: this.queryApi
    // }

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      // DEBUG
      // if (component.name) {
      //   window["c" + component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el);
      console.log(component);
      return component;
    });
    console.log(this.components);

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
