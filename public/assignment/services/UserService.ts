// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    public currentUser;
    private headers;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    auth() {
        return this.authHttp
            .post('/api/auth', '', {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }

    findUserById(userId: string) {
        console.log('woah')
        return this.authHttp
            .get('/api/assignment/user/' + userId.toString(), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }

    findUserByUsernameAndPassword(username: string, password: string) {
        return this.http
            .post('/api/assignment/login', JSON.stringify({username: username, password: password}), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                localStorage.setItem('jwt', res.jwt);
                this.currentUser = res.result;
                return res.result;
            });
    }

    findAllUsers() {
        return this.authHttp
            .get('/api/assignment/user', {headers: this.headers})
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
            .delete('/api/assignment/user/' + guid, {headers: this.headers})
            .map(res => res.json());
    }

    updateUser(userId, user) {
        console.log('update', userId, user)
        return this.authHttp
            .put('/api/assignment/user/' + userId, JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }
}
