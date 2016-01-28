import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../services/UserService";

@Component({
    selector: "register",
    templateUrl: "app/register/register.view.html",
})
export class Register {
    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
    }

    login(username: string, password: string, verify: string, email: string) {
        if (password === verify) {
            let user: User = {
                id: null,
                name: username,
                password: password,
                email: email,
            };
            let fn = (user) => {
                this._userService.setUser(user);
                this._router.navigate(["/Profile"]);
            };
            this._userService.createUser(user, fn);
        }
    }
}
