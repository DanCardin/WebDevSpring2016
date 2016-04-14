import {Component} from "angular2/core";
import {Observable} from 'rxjs/Observable';

import {UserService} from "../../services/UserService";

@Component({
    selector: "admin",
    templateUrl: "assignment/views/admin/admin.view.html",
})
export class Admin {
    private users;
    private selectedUser;
    constructor(private userService: UserService) {
        this.users = this.userService.findAllUsers();
    }

    addUser(username, password, firstName, lastName, roles) {
        if (!(username.value || password.value || roles.value)) {
            return;
        }
        this.userService.createUser({
            username: username.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            roles: roles.value,
        }).subscribe()
        this.users = this.userService.findAllUsers();
    }

    updateUser(username, password, firstName, lastName, roles) {
        console.log('before', username.value, password.value)
        if (!(username.value || password.value) && this.selectedUser) {
            return;
        }
        this.userService.updateUser(this.selectedUser._id, {
            username: username.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            roles: roles.value === 'admin',
        }).subscribe()
        username.value = '';
        password.value = '';
        firstName.value = '';
        lastName.value = '';
        roles.value = '';
        this.users = this.userService.findAllUsers();
    }

    isAdmin(user) {
        if (user.isAdmin) {
            return 'admin';
        } else {
            return '';
        }
    }

    removeUser(user) {
        this.userService.deleteUserById(user._id).subscribe();
        this.users = this.userService.findAllUsers();
    }

    selectUser(user, username, password, firstName, lastName, roles) {
        this.selectedUser = user;
        username.value = user.username;
        password.value = user.password;
        firstName.value = user.firstName;
        lastName.value = user.lastName;
        if (user.isAdmin) {
            roles.value = 'admin';
        }
    }
}
