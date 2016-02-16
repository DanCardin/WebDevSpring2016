import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "login",
    templateUrl: "assignment/views/login/login.view.html",
})
export class Login {
    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
    }

    login(username: string, password: string) {
        this._userService
            .findUserByUsernameAndPassword(username, password)
            .then((user) => {
                console.log("logged in", user);
                this._userService.currentUser = user;
                this._router.navigate(["/Profile"]);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
