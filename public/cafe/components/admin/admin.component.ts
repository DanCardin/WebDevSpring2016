import {Component} from "angular2/core";
import {RouteConfig, Router, ROUTER_DIRECTIVES, RouterOutlet} from "angular2/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {Users} from "./users/users.component";
import {Buildings} from "./buildings/buildings.component";

@RouteConfig([
    {path: "/buildings", component: Buildings, name: "Buildings", useAsDefault: true},
    {path: "/users", component: Users, name: "Users"},
])
@Component({
    selector: "admin",
    templateUrl: "cafe/components/admin/admin.view.html",
    directives: [ROUTER_DIRECTIVES],
})
export class Admin {
    public tabs: Array<any> = [
        {title: 'Manage Reports', route: 'Buildings'},
        {title: 'Manage Buildings', route: 'Buildings'},
        {title: 'Manage Users', route: 'Users'},
    ];

    constructor(
        private router: Router
    ) {
    }

    linkActive(path: String) {
        return this.router.isRouteActive(this.router.generate([path]));
    }
}
