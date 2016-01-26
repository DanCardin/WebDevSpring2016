import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "app/services/UserService";

@Component({
    selector: "login",
    templateUrl: "app/login/login.view.html",
})
export class Login {
    constructor(
        private _router: Router,
        private _userService: UserService,
    ) {
    }

    login(username: string, password: string) {
        this._userService.findUserByUsernameAndPassword(
            username,
            password,
            (user: User) => {
                if (user) {
                    console.log("logged in", user);
                    this._userService.setUser(user);
                    this._router.navigate(["/Profile"]);
                }
            }
        );
    }
}
