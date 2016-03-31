import {Component} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "../path-aware.component";

import {UserService} from "../../services/UserService";

@Component({
    directives: [RouterLink, RouterOutlet],
    selector: "header",
    templateUrl: "assignment/views/header/header.view.html",
})
export class Header extends PathAware {
    constructor(router: Router, private userService: UserService) {
        super(router);
        this.router = router;
    }

    logout() {
        this.userService.currentUser = null;
        this.router.navigate(["/Login"]);
    }
}
