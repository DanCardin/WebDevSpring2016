import {Injectable} from "angular2/core";

export interface IForm {
    _id: string;
    userId: string;
    name: string;
}

export class Form implements IForm {
    _id: string;
    name: string;
    userId: string;

    constructor(name: string, userId: string, id: string=null) {
        if (id === null) {
            id = (new Date).getTime().toString();
        }
        this._id = id;
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
        let forms = [
            {_id: "000", title: "Contacts", userId: "123"},
            {_id: "010", title: "ToDo",     userId: "123"},
            {_id: "020", title: "CDs",      userId: "234"},
        ]
        for (let form of forms) {
            this._forms.set(form._id, new Form(form.title, form.userId, form._id));
        }
    }

    createFormForUser(form: IForm): Promise<IForm> {
        return new Promise<IForm>((resolve, reject) => {
            this._forms.set(form._id, form);
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
