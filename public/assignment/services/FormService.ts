// import {Guid} from "guid";
import {Injectable} from "angular2/core";

export interface IForm {
    id: string;
    userId: string;
    name: string;
}

export class Form implements IForm {
    id: string;
    name: string;
    userId: string;

    constructor(name: string) {
        this.id = null;
        this.name = name;
        this.userId = null;
    }
}

@Injectable()
export class FormService {
    private _forms: Array<IForm>;

    constructor() {
        this._forms = [];
    }

    createFormForUser(uid: string, form: IForm, callback: (IForm) => void) {
        // form.id = Guid.raw();
        form.id = "asdfasdf";
        form.userId = uid;
        this._forms.push(form);
        callback(form);
    }

    findAllFormsForUser(uid: string, callback: (Form) => void) {
        let userForms: Array<Form> = this._forms.filter((form) => {
            return form.userId === uid;
        });
        callback(userForms);
    }

    deleteFormById(formId: string, callback: (Form) => void) {
        let index: number;
        this._forms.forEach((form, i) => {
            if (form.id === formId) {
                index = i;
                return;
            }
        });
        this._forms.splice(index, 1);
        callback(this._forms);
    }

    updateFormById(formId: string, newForm: Form, callback: (Form) => void) {
        this._forms.forEach((form) => {
            if (form.id === formId) {
                for (let key in form) {
                    if (key === "id") {
                        continue;
                    }
                    form[key] = newForm[key];
                }
                callback(form);
            }
        });
    }
}
