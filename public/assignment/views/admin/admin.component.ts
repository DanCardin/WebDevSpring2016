import {Component} from "angular2/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "admin",
    templateUrl: "assignment/views/admin/admin.view.html",
})
export class Admin {
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
