import { CrmComponent } from "../../core/CrmComponent.js";
import { $ } from "../../core/dom.js";

export class FormAdd extends CrmComponent {
  static className = "crm__form-add";

  constructor($root, options) {
    super($root, {
      name: "FormAdd",
      listeners: ["click", "submit", 'input'],
      ...options,
    });
  }

  toHTML() {
    return `
    
    <div class="form-add visually-hidden">
    <div class="form-add__wrap">


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
            <div class="form-add__contacts-container visually-hidden">
                <ul class="form-add__contacts-list">
 
                </ul>
            </div>
            <button class="form-add__form-btn-add">Добавить контакт</button>
            <input class="form-add__form-submit" type="submit" value="Сохранить">
            <button class="form-add__form-btn-delete">Отмена</button>
        </form>
    </div>

    </div>
    </div>

        `;
  }

  // метод для связи с emitter.js
  connectEmitter() {
    // this.initSelect()
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

    if ($targetClick.class('form-add__form-btn-add', 'check')) {
      this.addContact()
    }
  }

  // метод для закрытия формы добавления клиента
  closeAddClient() {
    const $btnEdit = $(".form-add");
    $btnEdit.class("visually-hidden", "add");
    const $contactsList = $('.form-add__contacts-list').clear()
    const $contactsContainer = $('.form-add__contacts-container')
    if (!$contactsContainer.class('visually-hidden', 'check')) {
      $contactsContainer.class('visually-hidden', 'add')
    }
  }

  // метод, который добавляет контакт
  addContact() {
    const $contactsList = $('.form-add__contacts-list')
    const $contactsContainer = $('.form-add__contacts-container')
    if ($contactsContainer.class('visually-hidden', 'check')) {
      $contactsContainer.class('visually-hidden', 'remove')
    }
    const numberContacts = document.querySelectorAll('.form-add__contacts-item')
    const indexLastContact = numberContacts.length > 0 ? numberContacts.length - 1 : 0
    const lastContact = numberContacts.length > 0 ? numberContacts[indexLastContact] : 0
    let numberLastContact = numberContacts.length > 0 ? +lastContact.classList[1].split('-')[3] : 0
    const numberNewContact = ++numberLastContact
    const templateContact = `
    <div class="form-add__contacts-select-container form-add__contacts-select-container-${numberNewContact}">
        <select class="form-add__contacts-select form-add__contacts-select-${numberNewContact}" name="type">
            <option class="form-add__contacts-option" value="Phone">Телефон</option>
            <option class="form-add__contacts-option" value="Add-phone">Доп. телефон</option>
            <option class="form-add__contacts-option" value="Email">Email</option>
            <option class="form-add__contacts-option" value="VK">Vk</option>
            <option class="form-add__contacts-option" value="Other">Другое</option>
        </select>
    </div>
    <input class="form-add__contacts-input form-add__contacts-input-${numberNewContact}" type="text" placeholder="Введите данные контакта">
    <button class="form-add__contacts-btn-close form-add__contacts-btn-close-${numberNewContact} visually-hidden"></button>
    `
    const $newContact = $(document.createElement('li')).class('form-add__contacts-item', 'add').class(`form-add__contacts-item-${numberNewContact}`, 'add')
    $newContact.html(templateContact)
    $contactsList.append($newContact)
    this.initSelect(`.form-add__contacts-select-${numberNewContact}`)
  }

  // метод события input
  onInput(event) {
    this.showContactsBtnClose(event)
  }

  // метод, который скрывает илм показывает кнопку удалить контакт
  showContactsBtnClose(event) {
    const $input = $(event.target)
    if ($input.class('form-add__contacts-input', 'check') && event.target.value !== '') {
      const numberInput = +$input.$el.classList[1].split('-')[3]
      const btnCloseClass = `.form-add__contacts-btn-close-${numberInput}`
      const $btnClose = $(btnCloseClass)
      if ($btnClose.class('visually-hidden', 'check')) {
        $btnClose.class('visually-hidden', 'remove')
      }
    } else if ($input.class('form-add__contacts-input', 'check') && event.target.value === '') {
      const numberInput = +$input.$el.classList[1].split('-')[3]
      const btnCloseClass = `.form-add__contacts-btn-close-${numberInput}`
      const $btnClose = $(btnCloseClass)
      if ($btnClose.class('visually-hidden', 'check') === false) {
        $btnClose.class('visually-hidden', 'add')
      }
    }
  }

  // метод для отправки формы
  onSubmit(event) {
    event.preventDefault();
  }


  initSelect(selectorClass) {
    const $select = $(selectorClass).$el
    console.log($select);
    const choices = new Choices($select, {
      searchEnabled: false,
      itemSelectText: "",
      position: "bottom",
      classNames: {
        containerOuter: 'choices',
        containerInner: 'choices__inner',
        input: 'choices__input',
        inputCloned: 'choices__input--cloned',
        list: 'choices__list',
        listItems: 'choices__list--multiple',
        listSingle: 'choices__list--single',
        listDropdown: 'choices__list--dropdown',
        item: 'choices__item',
        itemSelectable: 'choices__item--selectable',
        itemDisabled: 'choices__item--disabled',
        itemChoice: 'choices__item--choice',
        placeholder: 'choices__placeholder',
        group: 'choices__group',
        groupHeading: 'choices__heading',
        button: 'choices__button',
        activeState: 'is-active',
        focusState: 'is-focused',
        openState: 'is-open',
        disabledState: 'is-disabled',
        highlightedState: 'is-highlighted',
        selectedState: 'is-selected',
        flippedState: 'is-flipped',
        loadingState: 'is-loading',
        noResults: 'has-no-results',
        noChoices: 'has-no-choices'
      },
    });

    const arrSelectValueInputType = [
      {
        selectValue: 'Phone',
        inputType: 'tel'
      },
      {
        selectValue: 'Add-phone',
        inputType: 'tel'
      },
      {
        selectValue: 'Email',
        inputType: 'email'
      },
      {
        selectValue: 'VK',
        inputType: 'text'
      },
      {
        selectValue: 'Other',
        inputType: 'text'
      },
    ]

    $select.addEventListener(
      'choice',
      function(event) {
        const selectValue = event.detail.choice.value
        console.log(event.target.classList);
        const selectNumber = +event.target.classList[1].split('-')[3]
        console.log(selectNumber);
        const input = $(`.form-add__contacts-input-${selectNumber}`)
        for (let el of arrSelectValueInputType) {
          console.log(el);
          if (el.selectValue === selectValue) {
            console.log(input.attribute('type', el.inputType));
          }
        }
        
      },
      false,
    );
  }

  typeInput(selectClass) {

  }
}
