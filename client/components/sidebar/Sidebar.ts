import {Component, OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "../PathAware";

@Component({
    directives: [RouterLink, RouterOutlet],
    selector: "sidebar",
    templateUrl: "public/assignment/sidebar.view.html",
})
export class Sidebar extends PathAware {
    constructor(router: Router) {
        super(router);
    }
}
