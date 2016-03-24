import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "login",
    templateUrl: "cafe/components/login/login.view.html",
})
export class Login {
    constructor(private router: Router, private userService: UserService) {}

    login(username: string, password: string) {
        this.userService
            .findUserByUsernameAndPassword(username, password)
            .subscribe((user) => {
                if (user) {
                    this.router.navigate(["/Profile"]);
                }
            });
    }

    register(username: string, password: string, verify: string, email: string) {
        if (password && verify && password === verify) {
            let user: User = new User(username, password, email);
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
