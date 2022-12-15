import { $ } from "./dom.js";

export class ValidationForm {
  constructor() {
    // this.$form = ''
    // this.formMod = 'default'
  }

  returnArrInputs($formBlock) {
    console.log($formBlock);
    const $form = $formBlock.getChildNodes()[1].childNodes[1].childNodes[3];
    console.log($form);
    let level = 1;
  }

  returnArrInputTypeText(arr) {
    return arr.filter((input) => input.getAttribute("type") === "text");
  }

  checkValueInput(arr) {
    // console.log(arr);
    for (let input of arr) {
      //   console.log(input);
      if (input.value === "") {
        alert("заполните поля");
        return;
      }
    }
  }

  // проверяет состояние формы
  stateValueForm() {}
}
