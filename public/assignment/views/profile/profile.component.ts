import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "assignment/views/profile/profile.view.html",
})
export class Profile {
    constructor(private _router: Router, private userService: UserService) {}

    update(username: string,
           password: string,
           firstName: string,
           lastName: string,
           email: string
    ) {
        let update = new User(username, password, email, firstName, lastName);
        if (this.userService.currentUser) {
            this.userService
                .updateUser(this.userService.currentUser._id, update)
                .subscribe(res => {
                    if (res) {
                        this._router.navigate(["/Profile"]);
                    }
                })
        }
    }
}
