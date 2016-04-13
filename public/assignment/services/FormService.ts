// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class FormService {
    private headers;
    public currentForm;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    createFormForUser(userId, form) {
        return this.authHttp
            .post('/api/assignment/user/' + userId + '/form', JSON.stringify(form), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }

    findAllFormsForUser(userId) {
        return this.authHttp
            .get('/api/assignment/user/' + userId + '/form')
            .map(res => res.json())
            .map(res => res.result);
    }

    deleteFormById(formId) {
        return this.authHttp
            .delete('/api/assignment/form/' + formId)
            .map(res => res.json())
            .map(res => res.result);
    }

    updateFormById(formId, newForm) {
        return this.authHttp
            .put('/api/assignment/form/' + formId, JSON.stringify(newForm), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }
}
