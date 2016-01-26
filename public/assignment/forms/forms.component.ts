import {Component, OnInit} from "angular2/core";
import {RouteConfig, Router, ROUTER_DIRECTIVES, RouterOutlet} from "angular2/router";

import {FormsList} from "app/forms/form-list/form-list.component";
import {FieldsList} from "app/forms/form-fields/form-fields.component";

@RouteConfig([
    {path: "/forms", component: FormsList, name: "FormsList", useAsDefault: true},
    {path: "/fields", component: FieldsList, name: "FieldsList"},
])
@Component({
    selector: "forms",
    templateUrl: "app/forms/forms.view.html",
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
