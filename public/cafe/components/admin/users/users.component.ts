import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from 'rxjs/Observable';

import {UserService} from "../../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "cafe/components/admin/users/users.view.html",
})
export class Users {
    private users = [];
    private editedUser;
    constructor(private userService: UserService) {
        this.userService.findAllUsers().subscribe((users) => this.users = users);
    }

    addUser(username, password, admin) {
        if (!username.value && !password.value) {
            return;
        }
        this.editedUser = null;
        this.userService.createUser({
            username: username.value,
            password: password.value,
            isAdmin: admin.value,
        }, false).subscribe();
        this.userService.findAllUsers().subscribe((users) => this.users = users);
    }

    removeUser(user) {
        this.editedUser = null;
        this.userService.deleteUserById(user._id).subscribe();
        this.userService.findAllUsers().subscribe((users) => this.users = users);
    }

    editUser(user, username, admin) {
        this.editedUser = user;
        username.value = user.username;
        admin.value = user.isAdmin;
    }

    commitEdit(username, password, admin) {
        this.userService.updateUser(this.editedUser._id, false).subscribe();
        this.userService.findAllUsers().subscribe((users) => this.users = users);
        this.editedUser = null;
    }
}
