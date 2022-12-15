import { CrmComponent } from "../../core/CrmComponent.js";
import { $ } from "../../core/dom.js";

export class FormEdit extends CrmComponent {
  static className = "crm__form-edit";

  constructor($root, options) {
    super($root, {
      name: "FormEdit",
      listeners: ["click", "submit"],
      ...options,
    });
  }
  // <div class="form-edit__bg"></div>
  // метод, который вызывает HTML структуру компонента
  toHTML() {
    // this.validationForm.returnArrInputs(this.$root)
    return `
            <div class="form-edit visually-hidden">
                <div class="form-edit__container">
                    <div class="form-edit__header">
                        <h3 class="form-edit__title">Изменить данные</h3>
                        <span class="form-edit__header-span">ID:123458</span>
                        <button class="form-edit__header-btn">
                            <span class="form-edit__header-btn-span form-edit__header-btn-1"></span>
                            <span class="form-edit__header-btn-span form-edit__header-btn-2"></span>
                        </button>
                    </div>
                    <form action="" class="form-edit__form" method="post">
                        <ul class="form-edit__list">
                            <li class="form-edit__item">
                                <span class="form-edit__item-span">Фамилия<span class="form-edit__item-star">*</span></span>
                                <input class="form-edit__input" type="text">
                            </li>
                            <li class="form-edit__item">
                                <span class="form-edit__item-span">Имя<span class="form-edit__item-star">*</span></span>
                                <input class="form-edit__input" type="text">
                            </li>
                            <li class="form-edit__item">
                                <span class="form-edit__item-span">Отчество</span>
                                <input class="form-edit__input" type="text">
                            </li>
                        </ul>
                        <button class="form-edit__form-btn-add" type="button">Добавить контакт</button>
                        <input class="form-edit__form-submit" type="submit" value="Сохранить">
                        <button class="form-edit__form-btn-delete" type="button">Удалить клиента</button>
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
      $targetClick.class("form-edit__header-btn", "check") ||
      $targetClick.class("form-edit__header-btn-span", "check")
    ) {
      this.closeEditClient();
    }
  }

  // метод для отправки форсы
  onSubmit(event) {
    event.preventDefault();
    console.log(1);
    this.editClient();
  }

  // метод закрытия окна редактирования клиента
  closeEditClient() {
    const $btnEdit = $(".form-edit");
    $btnEdit.class("visually-hidden", "add");
  }

  // метод, который удаляет клиента
  deleteClient() {
    return "";
  }

  // метод редактирования клиента
  editClient() {
    console.log(this.$root);
    this.validationForm.checkValueInput(
      this.validationForm.returnArrInputTypeText(
        this.algorithms.searchObjTree(this.$root.getChildNodes())
      )
    );
  }
}
