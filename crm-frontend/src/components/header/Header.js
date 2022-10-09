import { CrmComponent } from "../../core/CrmComponent.js";
import { QueryApi } from "../../core/QueryApi.js";

export class Header extends CrmComponent {
  static className = "crm__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "submit"],
      ...options,
    });
    this.query = new QueryApi(options.emitter)
  }

  // метод по запросу из формы в хедере
  // async query(queryText) {
  //   const queryPath = "http://localhost:3000/api/clients?id=12345";
  //   const queryAPI = await fetch(queryPath, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //   }).then(async (data) => {
  //     const res = await data.json();
  //     const clientsArr = res !== [] ? res : false;
  //     this.emitter.emit("onDownloadsClients", clientsArr);
  //   });
  // }

  // метод, который возвращает HTML структуру компонента
  toHTML() {
    return `
    <div class="header">
        <div class="header__container">
            <a class="header__link" href="#">
                <img class="header__logo" src="src/img/header-logo.svg" alt="SKB.">
            </a>
            <form class="header__form" action="../crm-backend/index.js" method="post">
                <input class="header__input" type="text" placeholder="Введите запрос">
            </form>
        </div>
    </div>
    `;
  }

  // метод для связи с emitter.js
  connectEmitter() {}

  // событие input
  onInput(event) {
    event.preventDefault();
    const inputValue = event.target.value.trim();
    this.query.queryStart(inputValue)
  }

  // событие submit
  // добавил, чтобы во время нажатия интера в форму страница не перезагружалась
  onSubmit(event) {
    event.preventDefault();
  }
}
