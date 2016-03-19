// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface IUser {
    _id: number;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export class User implements IUser {
    _id: number;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;

    constructor(
        name: string, password: string, email: string,
        firstName: string="", lastName: string="",
        id: number=null
    ) {
        if (id === null) {
            id = Number((new Date).getTime().toString());
        }
        this._id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = "admin";
    }

    get isAdmin(): boolean {
        return this.role === "admin";
    }

    toJson() {
        return {
            _id: this._id,
            username: this.name,
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
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
            .get('/api/assignment/user/' + creds)
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
            .get('/api/assignment/user')
            .map(res => res.json())
            .map(res => {
                let result = [];
                for (let i = 0; i < res.length; i++) {
                    let r = res[i];
                    result.push(new User(r.username, r.password, '', r.firstName, r.lastName, r._id));
                }
                return result;
            });
    }

    createUser(user: User) {
        return this.http
            .post('/api/assignment/user', JSON.stringify(user.toJson()), {headers: this.headers})
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
            .delete('/api/assignment/user/' + guid)
            .map(res => res.json());
    }

    updateUser(guid: number, user: User) {
        console.log('asdf', JSON.stringify(user.toJson()));
        return this.http
            .put('/api/assignment/user/' + guid.toString(), JSON.stringify(user.toJson()))
            .map(res => res.json())
            .map(res => {
                console.log(res);
                let result = [];
                for (let i = 0; i < res.length; i++) {
                    let r = res[i];
                    result.push(new User(r.username, r.password, '', r.firstName, r.lastName, r._id));
                }
                return result;
            });
    }
}
