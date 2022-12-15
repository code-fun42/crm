import { $ } from "../../core/dom.js";
import { strReverse } from "../../core/utils.js";

// функция, которая возвращает шаблон одного клиента
function clientTr(
  id,
  name,
  surname,
  lastName,
  createDate,
  createTime,
  updateDate,
  updateTime,
  contacts
) {
  return `
    <tr class="client__tbody-tr">
        <th class="clients__tbody-th clients__tbody-th-id">${id}</th>
        <th class="clients__tbody-th clients__tbody-th-name">${surname} ${name} ${lastName}</th>
        <th class="clients__tbody-th clients__tbody-th-date">
            <span class="clients__tbody-span">${createDate}</span>
            <span class="clients__tbody-span-date">${createTime}</span>
        </th>
        <th class="clients__tbody-th clients__tbody-th-editlast">
            <span class="clients__tbody-span">${updateDate}</span>
            <span class="clients__tbody-span-editlast">${updateTime}</span>
        </th>
        <th class="clients__tbody-th clients__tbody-th-contacts">
            <ul class="clients__tbody-list">
                <li class="clients__tbody-item clients__tbody-item-1 clients-vk"></li>
                <li class="clients__tbody-item clients__tbody-item-2 clients-facebook"></li>
                <li class="clients__tbody-item clients__tbody-item-3 clients-phone"></li>
                <li class="clients__tbody-item clients__tbody-item-4 clients-email"></li>
                <li class="clients__tbody-item clients__tbody-item-5 clients-remainder">+6</li>
            </ul>
        </th>
        <th class="clients__tbody-th clients__tbody-th-action">
            <ul class="clients-tbody-list-btn">
                <li class="clients__tbody-item-btn">
                    <button class="clients__tbody-button clients__tbody-button-edit">Изменить</button>
                </li>
                <li class="clients__tbody-item-btn">
                    <button class="clients__tbody-button clients__tbody-button-delete">Удалить</button>
                </li>
            </ul>
        </th>
    </tr>
    `;
}

// функция, которая возвращает объект со строками даты и времени для шаблона
function correctDateTime(strDateTime, mode) {
  const arrDateTime = strDateTime.split("T");
  const date = strReverse(arrDateTime[0].replace(/-/gi, "."));
  const time = strReverse(arrDateTime[1].slice(0, 5));

  if (mode === "create") {
    return {
      createDate: date,
      createTime: time,
    };
  } else {
    return {
      updateDate: date,
      updateTime: time,
    };
  }
}

// функция, которая готовит данные контактов для шаблонов клиента
function correctContacts(contacts) {
  console.log(contacts);
  let contactsTemplate = "";
  let countContacts = contacts.length;
  console.log(countContacts);
  if (countContacts > 0) {
    contacts.forEach((contact) => {
      // const contactTemplate = `
      //   <li class="clients__tbody-item clients__tbody-item-1 clients-vk"></li>
      // `

      const indexContact = contacts.indexOf(contact);
      console.log(indexContact);

      const socnetName = contact.type.toLowerCase();
      console.log(contact);
      // const arrAllSocnet = ['vk', 'facebook', 'phone', 'email']
      // arrAllSocnet.forEach(name => {

      // })
      if (indexContact > 3) {
        const remainderSocnet = countContacts - indexContact + 1;
      }
      contactsTemplate += `<li class="clients__tbody-item clients-${socnetName}"></li>`;
    });
  }
  console.log(contactsTemplate);
  return contactsTemplate;
}

// функция, которая возвращает шаблон с клиентами
function createTemplateTbodyTr(clients) {
  // в ней хранится шаблон всех клиентов объединенный
  let templateAllTr = "";

  // если клиентов несколько, то просто  перебираем их
  if (Array.isArray(clients)) {
    // перебираем массив клиентов и вставляем их данные в шаблон
    clients.forEach((client) => {
      const { id, name, surname, lastName, createdAt, updatedAt, contacts } =
        client;
      const { createDate, createTime } = correctDateTime(createdAt, "create");
      const { updateDate, updateTime } = correctDateTime(updatedAt, "update");
      const templateClient = clientTr(
        id,
        name,
        surname,
        lastName,
        createDate,
        createTime,
        updateDate,
        updateTime,
        correctContacts(contacts)
      );
      // добавляем шаблон клиента в шаблон всех клиентов
      templateAllTr += templateClient;
    });
  } else {
    if (clients["message"]) {
      return;
    }

    const { id, name, surname, lastName, createdAt, updatedAt, contacts } =
      clients;

    const { createDate, createTime } = correctDateTime(createdAt, "create");
    const { updateDate, updateTime } = correctDateTime(updatedAt, "update");
    const templateClient = clientTr(
      id,
      name,
      surname,
      lastName,
      createDate,
      createTime,
      updateDate,
      updateTime,
      correctContacts(contacts)
    );
    // добавляем шаблон клиента в шаблон всех клиентов
    templateAllTr += templateClient;
  }

  return templateAllTr;
}

// отрисовка стартового DOM
export function tableStartDom() {
  return `
    <div class="clients">
      <div class="clients__container">
          <div class="clients__block">
              <h1 class="clients__title">Клиенты</h1>
              <div class="table__container">
                  <table class="clients__table">
                      <thead class="clients__thead">
                          <tr class="clients__tr-title">
                              <th class="clients__th-title clients__th-title-id">
                                  <button href="" class="clients__tr-title-btn">
                                      <span class="clients__tr-title-span">ID</span>
                                      <span class="clients__tr-title-id-arrow"></span>
                                  </button>
                              </th>
                              <th class="clients__th-title clients__th-title-name">
                                  <button href="" class="clients__tr-title-btn">
                                      <span class="clients__tr-title-span">Фамилия Имя Отчество</span>
                                      <span class="clients__tr-title-name-arrow"></span>
                                      <span class="clients__tr-title-name-text"></span>
                                  </button>
                              </th>
                              <th class="clients__th-title clients__th-title-date">
                                  <button href="" class="clients__tr-title-btn">
                                      <span class="clients__tr-title-span clients__tr-title-span-date">Дата и
                                          время
                                          создания</span>
                                      <span class="clients__tr-title-date-arrow"></span>
                                  </button>
                              </th>
                              <th class="clients__th-title clients__th-title-editlast">
                                  <button href="" class="clients__tr-title-btn">
                                      <span class="clients__tr-title-span clients__tr-title-span-editlast">Последние
                                          изменения</span>
                                      <span class="clients__tr-title-editlast-arrow"></span>
                                  </button>
                              </th>
                              <th class="clients__th-title clients__th-title-contacts">
                                  <span class="clients__tr-title-span">Контакты</span>
                              </th>
                              <th class="clients__th-title clients__th-title-action">
                                  <span class="clients__tr-title-span">Действия</span>
                              </th>
                          </tr>
                      </thead>
                      <tbody class="clients__tbody">

                      </tbody>
                  </table>
                  <!-- <div class="clients__load">
                      <div class="clients__load-circle"></div>
                  </div> -->
              </div>
              <div class="clients__btn-block">
                <button class="clients__btn">Добавить клиента</button>
            </div>
          </div>
      </div>
    </div>
    `;
}

// функция, которая вставляет шаблон клиентов в dom
export function showClients(selectorTbody, arr) {
  // чистим внутренний dom tbody и потом вставляет шаблон клиентов
  $(selectorTbody).clear().html(createTemplateTbodyTr(arr));
}
