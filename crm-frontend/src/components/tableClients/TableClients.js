import { CrmComponent } from "../../core/CrmComponent.js";
import { $ } from "../../core/dom.js";
import { showClients, tableStartDom } from "./table.template.js";

export class TableClients extends CrmComponent {
  static className = "crm__table-clients";

  constructor($root, options) {
    super($root, {
      name: "TableClients",
      listeners: ["click"],
      ...options,
    });
    // console.log(options);
  }

  // метод, который вызывает стартовую HTML структуру компонента
  toHTML() {
    return tableStartDom();
  }

  toHTMLClients(clientsArr) {
    return showClients(".clients__tbody", clientsArr);
  }

  // анимация скачивания клиентов
  loadAnimation() {}

  // шаблон элемента скачивания клиентов
  toLoadHTML() {
    return `
        <div class="clients__load">
            <div class="clients__load-circle"></div>
        </div>
    `;
  }

  // метод для связи с emitter.js
  connectEmitter() {
    this.emitter.subscribe("onDownloadsClients", (clientsArr) => {
      this.toHTMLClients(clientsArr);
    });
  }

  // события клика
  onClick(event) {
    const $targetClick = $(event.target);
    if ($targetClick.class("clients__tbody-button-edit", "check")) {
      this.editClient();
    } else if ($targetClick.class("clients__btn", "check")) {
      this.addClient();
    }
  }

  // метод редактирование клиента
  editClient() {
    const $btnEdit = $(".form-edit");
    $btnEdit.class("visually-hidden", "remove");
  }

  // метод добавления клиента
  addClient() {
    const $btnEdit = $(".form-add");
    $btnEdit.class("visually-hidden", "remove");
  }
}
