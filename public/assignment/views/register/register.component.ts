import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "register",
    templateUrl: "assignment/views/register/register.view.html",
})
export class Register {
    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    login(username: string, password: string, verify: string, email: string) {
        if (password && verify && password === verify) {
            let user: User = new User(
                username,
                password,
                email
            );
            this.userService
                .createUser(user)
                .subscribe((user) => {
                    if (user) {
                        this.router.navigate(["/Profile"]);
                    }
                })
        }
    }
}
