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

    addUser(username, email, password, admin) {
        if (!username.value || !password.value || !email.value) {
            return;
        }
        this.editedUser = null;
        this.userService.createUser({
            username: username.value,
            email: email.value,
            password: password.value,
            isAdmin: admin.checked,
        }, false).subscribe(res => {
            username.value = '';
            email.value = '';
            password.value = '';
            admin.checked = false;
            this.userService.findAllUsers().subscribe(users => this.users = users);
        });
    }

    removeUser(user) {
        this.editedUser = null;
        this.userService.deleteUserById(user._id).subscribe(user => {
            this.userService.findAllUsers().subscribe((users) => {console.log(users);this.users = users});
        });
    }

    editUser(user, username, email, admin) {
        this.editedUser = user;
        username.value = user.username;
        email.value = user.email;
        admin.checked = user.isAdmin;
    }

    commitEdit(username, email, password, admin) {
        let update = {
            username: username.value,
            email: email.value,
            isAdmin: admin.checked,
            password: password.value,
        };
        if (!password.value) {
            update.password = this.editedUser.password;
        }
        console.log('passowrd', update)
        this.userService.updateUser(this.editedUser._id, update, false).subscribe(res => {
            this.userService.findAllUsers().subscribe((users) => {
                this.users = users;
                username.value = '';
                email.value = '';
                password.value = '';
                admin.checked = false;
            });
            this.editedUser = null;
        });
    }
}
