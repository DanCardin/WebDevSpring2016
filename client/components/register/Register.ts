import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: "register",
    templateUrl: "public/assignment/register.html",
})
export class Register implements OnInit {
    constructor(private router: Router) {}

    login(event) {
        event.preventDefault();

        this.router.navigate(["/Profile"]);
    }
}
