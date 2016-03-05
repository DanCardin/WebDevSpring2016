import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "cafe/components/admin/users/users.view.html",
})
export class Users {
    private users: Array<User> = [];
    constructor(
        private _userService: UserService
    ) {
        this.users = [];
        Observable
            .fromPromise(this._userService.findAllUsers())
            .subscribe(users => this.users = users);
    }
}
