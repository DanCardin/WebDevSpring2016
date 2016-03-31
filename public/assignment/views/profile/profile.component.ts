import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {UserService} from "../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "assignment/views/profile/profile.view.html",
})
export class Profile {
    private user;
    constructor(private _router: Router, private userService: UserService) {
        if (this.userService.currentUser) {
            this.userService.findUserById(this.userService.currentUser._id).subscribe(res => this.user = res);
        }
    }

    update(username: string,
           password: string,
           firstName: string,
           lastName: string,
           email: string
    ) {
        if (this.userService.currentUser) {
            let update = {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
            };
            this.userService
                .updateUser(this.userService.currentUser._id, update)
                .subscribe(res => {
                    if (res) {
                        this.user = res;
                        this._router.navigate(["/Profile"]);
                    }
                });
        }
    }
}
