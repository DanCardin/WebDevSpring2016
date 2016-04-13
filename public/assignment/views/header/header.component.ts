import {Component, OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "../path-aware.component";

import {UserService} from "../../services/UserService";
import {FormService} from "../../services/FormService";

@Component({
    directives: [RouterLink, RouterOutlet],
    selector: "header",
    templateUrl: "assignment/views/header/header.view.html",
})
export class Header extends PathAware implements OnInit {
    constructor(router: Router, private userService: UserService, private formService: FormService) {
        super(router);
    }

    ngOnInit() {
        this.userService.auth().subscribe();
    }

    logout() {
        localStorage.removeItem('jwt');
        this.userService.currentUser = null;
        this.formService.currentForm = null;
        this.router.navigate(["/Login"]);
    }
}
