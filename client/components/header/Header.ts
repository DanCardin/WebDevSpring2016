import {Component} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "../PathAware";

@Component({
    directives: [RouterLink, RouterOutlet],
    selector: "header",
    templateUrl: "public/assignment/header.view.html",
})
export class Header extends PathAware {
    constructor(router: Router) {
        super(router);
    }
}
