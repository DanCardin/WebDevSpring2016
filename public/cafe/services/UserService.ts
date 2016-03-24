// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface IUser {
    name: string;
    password: string;
    email: string;
}

export class User implements IUser {
    _id: number;
    name: string;
    password: string;
    email: string;

    constructor(name: string, password: string, email: string, id: number=null) {
        if (id === null) {
            id = Number((new Date).getTime().toString());
        }
        this._id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    get isAdmin(): boolean {
        return true;
    }

    toJson() {
        return {
            _id: this._id,
            username: this.name,
            password: this.password,
            email: this.email,
        };
    }
}

@Injectable()
export class UserService {
    private _currentUser: User;
    private headers;

    get currentUser(): User {
        return this._currentUser;
    }
    set currentUser(user: User) {
        this._currentUser = user;
    }

    constructor(public http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    findUserByUsernameAndPassword(username: string, password: string) {
        let creds = '?username=' + username + '&password=' + password;
        return this.http
            .get('/api/cafe/user/' + creds)
            .map(res => res.json())
            .map(res => {
                console.log('res', res);
                if (!res) {
                    Observable.throw(new Error('error!'))
                } else {
                    this.currentUser = res;
                    return res;
                }
            });
    }

    findAllUsers(): Observable<Array<{}>> {
        return this.http
            .get('/api/cafe/user')
            .map(res => res.json())
            .map(res => {
                let result = [];
                for (let i = 0; i < res.length; i++) {
                    let r = res[i];
                    result.push(new User(r.username, r.password, r._id));
                }
                return result;
            });
    }

    createUser(user: User) {
        return this.http
            .post('/api/cafe/user', JSON.stringify(user.toJson()), {headers: this.headers})
            .map(res => res.json())
            .map(res => {
                console.log('res', res)
                if (!res) {
                    Observable.throw(new Error('error!'))
                } else {
                    this.currentUser = res;
                    return res;
                }
            });
    }

    deleteUserById(guid: string) {
        return this.http
            .delete('/api/cafe/user/' + guid)
            .map(res => res.json());
    }

    updateUser(guid: number, user: User) {
        console.log('asdf', JSON.stringify(user.toJson()));
        return this.http
            .put('/api/cafe/user/' + guid.toString(), JSON.stringify(user.toJson()))
            .map(res => res.json())
            .map(res => {
                console.log(res);
                let result = [];
                for (let i = 0; i < res.length; i++) {
                    let r = res[i];
                    result.push(new User(r.username, r.password, r._id));
                }
                return result;
            });
    }
}
