// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private _currentUser;
    private headers;

    get currentUser() {
        return this._currentUser;
    }
    set currentUser(user) {
        this._currentUser = user;
    }

    constructor(public http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    findUserById(userId: string) {
        return this.http
            .get('/api/assignment/user/' + userId.toString())
            .map(res => res.json())
            .map(res => res.result);
    }

    findUserByUsernameAndPassword(username: string, password: string) {
        return this.http
            .get('/api/assignment/user/' + '?username=' + username + '&password=' + password)
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }

    findAllUsers() {
        return this.http
            .get('/api/assignment/user')
            .map(res => res.json())
            .map(res => res.result);
    }

    createUser(user) {
        return this.http
            .post('/api/assignment/user', JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }

    deleteUserById(guid: string) {
        return this.http
            .delete('/api/assignment/user/' + guid)
            .map(res => res.json());
    }

    updateUser(userId, user) {
        return this.http
            .put('/api/assignment/user/' + userId.toString(), JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }
}
