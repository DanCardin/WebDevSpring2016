import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from 'rxjs/Observable';

import {UserService} from "../../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "cafe/components/admin/users/users.view.html",
})
export class Users {
    private users;
    constructor(private userService: UserService) {
        this.users = this.userService.findAllUsers();
    }
}
