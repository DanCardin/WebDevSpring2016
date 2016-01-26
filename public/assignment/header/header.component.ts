import {Component} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "app/path-aware.component";

@Component({
    directives: [RouterLink, RouterOutlet],
    selector: "header",
    templateUrl: "app/header/header.view.html",
})
export class Header extends PathAware {
    constructor(router: Router) {
        super(router);
    }
}
