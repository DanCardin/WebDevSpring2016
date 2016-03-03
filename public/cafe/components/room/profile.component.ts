import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";

@Component({
    selector: "profile",
    templateUrl: "cafe/components/profile/profile.view.html",
})
export class Profile {
    userService: UserService;

    private universities = [{name: 'Northeastern'}];
    private selectedUniversityName: string;
    private selectedUniversity;

    constructor(
        private _router: Router,
        userService: UserService
    ) {
        this.userService = userService;
    }

    update(username: string,
           password: string,
           firstName: string,
           lastName: string,
           email: string
    ) {
        console.log('updating')
        let update = new User(username, password, email, firstName, lastName);
        this.userService
            .updateUser(this.userService.currentUser._id, update)
            .then(user => console.log("Updated"))
            .catch(error => console.log(error));
        this._router.navigate(["/Profile"]);
    }

    private onUniversitySelected() {
        // this.selectedRepository = this.repositories.find(repository => repository.name === this.selectedRepositoryName);
    }
}
