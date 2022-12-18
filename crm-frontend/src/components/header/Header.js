import { CrmComponent } from "../../core/CrmComponent.js";
// import { QueryApi } from "../../core/QueryApi.js";

export class Header extends CrmComponent {
  static className = "crm__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "submit"],
      ...options,
    });
    // console.log({...options});
    // this.query = new QueryApi(options.emitter)
  }

  // метод, который возвращает HTML структуру компонента
  toHTML() {
    // this.$root.getChildNodes()
    return `
    <div class="header">
        <div class="header__container">
            <a class="header__link" href="#">
                <img class="header__logo" src="src/assets/img/header-logo.svg" alt="SKB.">
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
    // this.query.queryStart(inputValue)
    this.queryToClients(inputValue)
  }
  
  // делаем запрос, использую класс QueryApi
  async queryToClients(id) {
    const path = `http://localhost:3000/api/clients/${id}`
    const res = await this.queryApi.query(path, "GET")
    console.log(res);
    if (Array.isArray(res) || typeof res === 'object') {
      this.sendToTable(res)
    }
  }

  // отправляет клиентов в таблицу
  sendToTable(clients) {
    this.emitter.emit("onDownloadsClients", clients);
  }

  // событие submit
  // добавил, чтобы во время нажатия интера в форму страница не перезагружалась
  onSubmit(event) {
    event.preventDefault();
  }
}
