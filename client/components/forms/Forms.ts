import {Component, OnInit} from "angular2/core";
import {RouteConfig, Router, ROUTER_DIRECTIVES, RouterOutlet} from "angular2/router";

import {FormsList} from "../forms/forms-list/FormsList";
import {FieldsList} from "../forms/fields-list/FieldsList";

@RouteConfig([
    {path: "/forms", component: FormsList, name: "FormsList", useAsDefault: true},
    {path: "/fields", component: FieldsList, name: "FieldsList"},
])
@Component({
    selector: "forms",
    templateUrl: "public/assignment/forms.html",
    directives: [ROUTER_DIRECTIVES],
})
export class Forms implements OnInit {
    constructor(private router: Router) {
        this.router = router;
    }

    linkActive(path: String) {
        return this.router.isRouteActive(this.router.generate([path]));
    }
}
