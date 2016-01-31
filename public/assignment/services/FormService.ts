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

    constructor(name: string, userId: string) {
        // form.id = Guid.raw();
        this.id = 'asdfsadf';
        this.name = name;
        this.userId = userId;
    }
}

@Injectable()
export class FormService {
    private _forms: Map<string, IForm>;
    private _currentForm: IForm;
    get currentForm() {
        return this._currentForm;
    }
    set currentForm(form: IForm) {
        this._currentForm = form;
    }

    constructor() {
        this._forms = new Map<string, IForm>();
        let form = new Form("SomeForm", "asdflaskdjfasldkfj");
        this._forms.set(form.id, form);
    }

    createFormForUser(form: IForm): Promise<IForm> {
        return new Promise<IForm>((resolve, reject) => {
            this._forms.set(form.id, form);
            return resolve(form);
        });
    }

    findAllFormsForUser(uid: string): Promise<Array<IForm>> {
        return new Promise<Array<IForm>>((resolve, reject) => {
            resolve(Array.from(this._forms.values()).filter((form) => {
                return form.userId === uid;
            }));
        });
    }

    deleteFormById(formId: string): Promise<Array<IForm>> {
        return new Promise<Array<IForm>>((resolve, reject) => {
            if (this._forms.has(formId)) {
                this._forms.delete(formId);
            }
            resolve(Array.from(this._forms.values()));
        });
    }

    updateFormById(formId: string, newForm: Form): Promise<IForm> {
        return new Promise<IForm>((resolve, reject) => {
            if (this._forms.has(formId)) {
                let form = this._forms.get(formId);
                Object.keys(form).forEach((key) => {
                    if (key !== "id") {
                        form[key] = newForm[key];
                    }
                });
                return resolve(form)
            }
            return reject("this form doesnt exist");
        });
    }
}
