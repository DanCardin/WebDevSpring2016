import {Component} from "angular2/core";
import {Observable} from 'rxjs/Observable';

import {UserService} from "../../services/UserService";

@Component({
    selector: "admin",
    templateUrl: "assignment/views/admin/admin.view.html",
})
export class Admin {
    private users = [];
    private selectedUser;
    constructor(private userService: UserService) {
        this.userService.findAllUsers().subscribe(users => this.users = users);
    }

    addUser(username, password, firstName, lastName, isAdmin) {
        if (!username.value || !password.value) {
            return;
        }
        this.userService.createUser({
            username: username.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            isAdmin: isAdmin.value === 'admin',
        }).subscribe(res => {
            this.userService.findAllUsers().subscribe(users => this.users = users);
            username.value = '';
            password.value = '';
            firstName.value = '';
            lastName.value = '';
            isAdmin.value = '';
        });
    }

    updateUser(username, password, firstName, lastName, isAdmin) {
        if ((!username.value || !password.value) && this.selectedUser) {
            return;
        }
        this.userService.updateUser(this.selectedUser._id, {
            username: username.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            isAdmin: isAdmin.value === 'admin',
        }).subscribe(res => {
            username.value = '';
            password.value = '';
            firstName.value = '';
            lastName.value = '';
            isAdmin.value = '';
            this.userService.findAllUsers().subscribe(users => this.users = users);
            this.selectedUser = null;
        });
    }

    isAdminFn(isAdmin) {
        if (isAdmin === 'true') {
            return 'admin';
        }
        return '';
    }

    removeUser(user) {
        this.userService.deleteUserById(user._id).subscribe(res => {
            this.userService.findAllUsers().subscribe(users => this.users = users);
        });
    }

    selectUser(user, username, password, firstName, lastName, roles) {
        this.selectedUser = user;
        username.value = user.username;
        password.value = user.password;
        firstName.value = user.firstName;
        lastName.value = user.lastName;
        console.log('userssss', user)
        if (user.isAdmin) {
            roles.value = 'admin';
        }
    }
}
