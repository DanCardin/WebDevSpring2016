import {Component} from "angular2/core";
import {Observable} from 'rxjs/Observable';

import {UserService} from "../../services/UserService";

@Component({
    selector: "admin",
    templateUrl: "assignment/views/admin/admin.view.html",
})
export class Admin {
    private users;
    constructor(private userService: UserService) {
        this.users = this.userService.findAllUsers();
    }
}
