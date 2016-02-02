import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "app/views/profile/profile.view.html",
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
        console.log('updating')
        let update = new User(username, password, email, firstName, lastName);
        this._userService
            .updateUser(this._userService.currentUser._id, update)
            .then(user => console.log("Updated"))
            .catch(error => console.log(error));
        this._router.navigate(["/Profile"]);
    }
}
