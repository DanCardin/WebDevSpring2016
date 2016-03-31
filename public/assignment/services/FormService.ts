// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class FormService {
    private headers;
    public currentForm;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    createFormForUser(userId, form) {
        return this.http
            .post('/api/assignment/user/' + userId + '/form', JSON.stringify(form), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }

    findAllFormsForUser(userId) {
        return this.http
            .get('/api/assignment/user/' + userId + '/form')
            .map(res => res.json())
            .map(res => res.result);
    }

    deleteFormById(formId) {
        return this.http
            .delete('/api/assignment/form/' + formId)
            .map(res => res.json())
            .map(res => res.result);
    }

    updateFormById(formId, newForm) {
        return this.http
            .put('/api/assignment/form/' + formId, JSON.stringify(newForm), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }
}
