// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    public currentUser;
    private headers;

    constructor(public http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
    }

    findUserById(userId: string) {
        return this.http
            .get('/api/cafe/user/' + userId)
            .map(res => res.json())
            .map(res => res.result);
    }

    findUserByUsernameAndPassword(username: string, password: string) {
        return this.http
            .get('/api/cafe/user/' + '?username=' + username + '&password=' + password)
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                console.log('resss', res.result);
                return res.result;
            });
    }

    findAllUsers(): Observable<Array<{}>> {
        return this.authHttp
            .get('/api/cafe/user')
            .map(res => res.json())
            .map(res => res.result);
    }

    createUser(user) {
        return this.http
            .post('/api/cafe/user', JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }

    deleteUserById(userId) {
        return this.http
            .delete('/api/cafe/user/' + userId)
            .map(res => res.json());
    }

    updateUser(guid, user) {
        return this.http
            .put('/api/cafe/user/' + guid, JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }
}
