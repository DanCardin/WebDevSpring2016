import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: "profile",
    templateUrl: "app/profile/profile.view.html",
})
export class Profile implements OnInit {
    constructor(private router: Router) {}

    update() {
        event.preventDefault();

        this.router.navigate(["/Profile"]);
    }
}
