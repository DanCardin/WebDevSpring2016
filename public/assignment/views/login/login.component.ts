import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {UserService} from "../../services/UserService";

@Component({
    selector: "login",
    templateUrl: "assignment/views/login/login.view.html",
})
export class Login {
    constructor(private router: Router, private userService: UserService) {}

    login(username: string, password: string) {
        this.userService
            .findUserByUsernameAndPassword(username, password)
            .subscribe((user) => {
                if (user) {
                    console.log("logged in", user);
                    this._router.navigate(["/Profile"]);
                }
            });
    }
}
