import { CrmComponent } from "../../core/CrmComponent.js";
import { $ } from "../../core/dom.js";

export class FormAdd extends CrmComponent {
  static className = "crm__form-add";

  constructor($root, options) {
    super($root, {
      name: "FormAdd",
      listeners: ["click", "submit"],
      ...options,
    });
  }

  toHTML() {
    return `
            <div class="form-add visually-hidden">
                <div class="form-add__container">
                    <div class="form-add__header">
                      <h3 class="form-add__title">Новый клиент</h3>
                      <button class="form-add__header-btn">
                          <span class="form-add__header-btn-span form-add__header-btn-1"></span>
                          <span class="form-add__header-btn-span form-add__header-btn-2"></span>
                      </button>
                    </div>
                    <form action="" class="form-add__form" method="post">
                      <ul class="form-add__list">
                          <li class="form-add__item">
                              <span class="form-add__item-span">Фамилия<span class="form-add__item-star">*</span></span>
                              <input class="form-add__input" type="text">
                          </li>
                          <li class="form-add__item">
                              <span class="form-add__item-span">Имя<span class="form-add__item-star">*</span></span>
                              <input class="form-add__input" type="text">
                          </li>
                          <li class="form-add__item">
                              <span class="form-add__item-span">Отчество</span>
                              <input class="form-add__input" type="text">
                          </li>
                      </ul>
                      <button class="form-add__form-btn-add">Добавить контакт</button>
                      <input class="form-add__form-submit" type="submit" value="Сохранить">
                      <button class="form-add__form-btn-delete">Отмена</button>
                    </form>
                </div>  
            </div>
        `;
  }

  // метод для связи с emitter.js
  connectEmitter() {
    return "";
  }

  // события клика
  onClick(event) {
    const $targetClick = $(event.target);
    if (
      $targetClick.class("form-add__header-btn", "check") ||
      $targetClick.class("form-add__header-btn-span", "check")
    ) {
      this.closeAddClient();
    }
  }

  // метод для закрытия формы добавления клиента
  closeAddClient() {
    const $btnEdit = $(".form-add");
    $btnEdit.class("visually-hidden", "add");
  }

  // метод для отправки формы
  onSubmit(event) {
    event.preventDefault();
  }
}
