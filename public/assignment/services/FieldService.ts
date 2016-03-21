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

    createFieldForForm(uid: number, field) {
        return this.http
            .post(
                '/api/assignment/form/' + uid + '/field',
                JSON.stringify(field),
                {headers: this.headers}
            )
            .map(res => res.json());
    }

    getFieldsForForm(uid: number) {
        return this.http
            .get('/api/assignment/form/' + uid + '/field')
            .map(res => res.json())
            .map(res => {
                let result = [];
                console.log('res', res)
                for (let i = 0; i < res.length; i++) {
                    result.push(res[i]);
                }
                return result;
            });
    }

    getFieldForForm(uid: number, fieldId: number) {
        return this.http
            .get('/api/assignment/form/' + uid + '/field/' + fieldId)
            .map(res => res.json());
    }

    deleteFormById(formId: number, fieldId: number) {
        return this.http
            .delete('/api/assignment/form/' + formId + '/field/' + fieldId)
            .map(res => res.json());
    }

    updateFormById(formId: number, fieldId: number, newForm) {
        return this.http
            .put(
                '/api/assignment/form/' + formId + '/field/' + fieldId,
                JSON.stringify(newForm),
                {headers: this.headers}
            )
            .map(res => res.json());
    }
}
