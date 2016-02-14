import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "register",
    templateUrl: "cafe/components/register/register.view.html",
})
export class Register {
    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
    }

    login(username: string, password: string, verify: string, email: string) {
        if (password === verify) {
            let user: User = new User(
                username,
                password,
                email
            );
            this._userService
                .createUser(user)
                .then((user) => {
                    this._userService.currentUser = user;
                    this._router.navigate(["/Profile"]);
                })
                .catch(error => console.log(error));
        }
    }
}
