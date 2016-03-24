import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "cafe/components/profile/profile.view.html",
})
export class Profile {
    constructor(private router: Router, private userService: UserService) {}

    update(username: string, password: string, email: string) {
        let update = new User(username, password, email);
        this.userService.updateUser(this.userService.currentUser._id, update);
        this.router.navigate(["/Profile"]);
    }
}
