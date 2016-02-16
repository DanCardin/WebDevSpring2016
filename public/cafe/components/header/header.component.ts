import {Component} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "../path-aware.component";
import {Search} from "../search/search.component";

import {User, UserService} from "../../services/UserService";
import {SearchService} from "../../services/SearchService";

@Component({
    selector: "header",
    directives: [RouterLink, RouterOutlet, Search],
    templateUrl: "cafe/components/header/header.view.html",
    providers: [SearchService],
})
export class Header extends PathAware {
    userService: UserService;
    constructor(
        router: Router,
        userService: UserService
    ) {
        super(router);

        this.userService = userService;
    }

    logout() {
        this.userService.currentUser = null;
        this.router.navigate(["/Login"]);
    }
}
