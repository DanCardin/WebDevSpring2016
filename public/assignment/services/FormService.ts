// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface IForm {
    _id: number;
    userId: number;
    name: string;
}

export class Form implements IForm {
    _id: number;
    userId: number;
    name: string;

    constructor(name: string, userId: number, id: number=null) {
        if (id === null) {
            id = (new Date).getTime();
        }
        this._id = id;
        this.name = name;
        this.userId = userId;
    }

    toJson() {
        return {
            _id: this._id,
            title: this.name,
            userId: this.userId,
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

    createFormForUser(uid: number, form: Form) {
        return this.http
            .post('/api/assignment/user/' + uid + '/form', JSON.stringify(form.toJson()), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                let result = [];
                console.log('res', res)
                for (let i = 0; i < res.length; i++) {
                    let form = res[i];
                    result.push(new Form(form.title, form.userId, form._id));
                }
                return result;
            });
    }

    findAllFormsForUser(uid: number) {
        return this.http
            .get('/api/assignment/user/' + uid + '/form')
            .map(res => res.json())
            .map(res => {
                let result = [];
                console.log('res', res)
                for (let i = 0; i < res.length; i++) {
                    let form = res[i];
                    result.push(new Form(form.title, form.userId, form._id));
                }
                return result;
            });
    }

    deleteFormById(formId: number) {
        return this.http
            .delete('/api/assignment/user/' + formId)
            .map(res => res.json());
    }

    updateFormById(formId: number, newForm: Form) {
        return this.http
            .put('/api/assignment/form/' + formId, JSON.stringify(newForm.toJson()), {headers: this.headers})
            .map(res => res.json());
    }
}
