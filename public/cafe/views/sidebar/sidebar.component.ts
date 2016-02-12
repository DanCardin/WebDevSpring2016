import {Component, OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "../path-aware.component";

import {User, UserService} from "../../services/UserService";

@Component({
    directives: [RouterLink, RouterOutlet],
    selector: "sidebar",
    templateUrl: "cafe/views/sidebar/sidebar.view.html",
})
export class Sidebar extends PathAware {
    userService: UserService;
    constructor(
        router: Router,
        userService: UserService
    ) {
        super(router);

        this.userService = userService;
    }
}
