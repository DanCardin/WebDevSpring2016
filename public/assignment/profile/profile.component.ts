import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "app/profile/profile.view.html",
})
export class Profile {
    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
    }

    update(username: string,
           password: string,
           firstName: string,
           lastName: string,
           email: string
    ) {
        let thisUser = this._userService.getUser();
        let update = {
            name: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        let fn = (user) => void {
        };
        this._userService.updateUser(thisUser.id, update, fn);
        this._router.navigate(["/Profile"]);
    }
}
