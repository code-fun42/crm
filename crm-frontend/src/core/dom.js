class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
    // this.$$listeners = {}
  }

  // метод для работа с html
  // является и геттером, и сеттером
  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  // метод для работы с классами
  // // является и геттером, и сеттером
  class(classValue, mode = "") {
    if (typeof classValue === "string") {
      if (mode === "add") {
        this.$el.classList.add(classValue);
        return this;
      } else if (mode === "remove") {
        this.$el.classList.remove(classValue);
        return this;
      } else if (mode === "check") {
        return this.$el.className.split(" ").filter((str) => str === classValue)
          .length > 0
          ? true
          : false;
      } else {
        this.$el.className = classValue;
        return this;
      }
    }
    return this.$el.className;
  }

  // метод для работа с текстом
  // является и геттером, и сеттером
  text(text) {
    if (typeof text === "string") {
      this.$el.textContent = text;
      return this;
    }
    return this.$el.textContent;
  }

  // очищает html
  clear() {
    this.html("");
    return this;
  }

  // метод добавления событий
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  // метод удаления событий
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  // метод по добавлению dom элемента
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    // appendChild старый метод
    // сделал if, чтобы поддерживать его
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

// метод, который создаем dom элемент
$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
