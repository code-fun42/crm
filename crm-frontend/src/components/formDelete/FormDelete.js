import { CrmComponent } from "../../core/CrmComponent.js";

export class FormDelete extends CrmComponent {
    static className = 'crm__form-delete'

    constructor($root, options) {
        super($root, {
          name: 'FormDelete',
            ...options
        })
    }
}