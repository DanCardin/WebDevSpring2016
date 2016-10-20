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

    constructor(public http: Http, public authHttp: AuthHttp) {
        this.headers = new Headers();
        this.headers = new Headers();
    }

    auth() {
        return this.authHttp
            .post('/api/cafe/auth', '', {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                this.currentUser = res.result;
                return res.result;
            });
    }

    findUserById(userId: string) {
        console.log('findUserById');
        return this.authHttp
            .get('/api/cafe/user/' + userId)
            .map(res => res.json())
            .map(res => res.result);
    }

    findUserByUsernameAndPassword(username: string, password: string) {
        return this.http
            .post('/api/cafe/login', JSON.stringify({username: username, password: password}), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                localStorage.setItem('jwt', res.jwt);
                this.currentUser = res.result;
                return res.result;
            });
    }

    findAllUsers(): Observable<Array<{}>> {
        return this.authHttp
            .get('/api/cafe/user')
            .map(res => res.json())
            .map(res => res.result);
    }

    createUser(user, update=true) {
        console.log('new user', user)
        return this.http
            .post('/api/cafe/user', JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                if (update) {
                    this.currentUser = res.result;
                }
                return res.result;
            });
    }

    deleteUserById(userId) {
        return this.authHttp
            .delete('/api/cafe/user/' + userId)
            .map(res => res.json());
    }

    updateUser(guid, user, update=true) {
        return this.authHttp
            .put('/api/cafe/user/' + guid, JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                if (update) {
                    this.currentUser = res.result;
                }
                return res.result;
            });
    }
}
