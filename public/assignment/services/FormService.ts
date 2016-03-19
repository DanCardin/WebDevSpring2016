// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


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

    toJson() {
        return {
            _id: this._id,
            title: this.name,
            userId: this.userName,
        };
    }
}

@Injectable()
export class FormService {
    private headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    createFormForUser(form: IForm) {
        // return new Promise<IForm>((resolve, reject) => {
        //     this._forms.set(form._id, form);
        //     return resolve(form);
        // });
    }

    findAllFormsForUser(uid: string) {
        return this.http
            .get('/api/assignment/form')
            .map(res => res.json())
            .map(res => {
                let result = [];
                for (let i = 0; i < res.length; i++) {
                    let form = res[i];
                    result.push(new Form(form.name, form.userId, form._id));
                }
                return result;
            })
        // return new Promise<Array<IForm>>((resolve, reject) => {
        //     resolve(Array.from(this._forms.values()).filter((form) => {
        //         return form.userId === uid;
        //     }));
        // });
    }

    deleteFormById(formId: string) {
        // return new Promise<Array<IForm>>((resolve, reject) => {
        //     if (this._forms.has(formId)) {
        //         this._forms.delete(formId);
        //     }
        //     resolve(Array.from(this._forms.values()));
        // });
    }

    updateFormById(formId: string, newForm: Form) {
        // return new Promise<IForm>((resolve, reject) => {
        //     if (this._forms.has(formId)) {
        //         let form = this._forms.get(formId);
        //         Object.keys(form).forEach((key) => {
        //             if (key !== "id") {
        //                 form[key] = newForm[key];
        //             }
        //         });
        //         return resolve(form)
        //     }
        //     return reject("this form doesnt exist");
        // });
    }
}
