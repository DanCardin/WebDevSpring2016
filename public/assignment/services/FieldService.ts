// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class FieldService {
    public selectedField = null;
    private headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    createFieldForForm(formId, field) {
        return this.http
            .post(
                '/api/assignment/form/' + formId + '/field',
                JSON.stringify(field), {headers: this.headers}
            )
            .map(res => res.json())
            .map(res => res.result);
    }

    getFieldsForForm(formId) {
        return this.http
            .get('/api/assignment/form/' + formId + '/field')
            .map(res => res.json())
            .map(res => res.result);
    }

    getFieldForForm(formId, fieldId) {
        return this.http
            .get('/api/assignment/form/' + formId + '/field/' + fieldId)
            .map(res => res.json())
            .map(res => res.result);
    }

    deleteFormById(formId, fieldId) {
        return this.http
            .delete('/api/assignment/form/' + formId + '/field/' + fieldId)
            .map(res => res.json())
            .map(res => res.result);
    }

    updateFormById(formId, fieldId, newForm) {
        return this.http
            .put(
                '/api/assignment/form/' + formId + '/field/' + fieldId,
                JSON.stringify(newForm), {headers: this.headers}
            )
            .map(res => res.json())
            .map(res => res.result);
    }
}
