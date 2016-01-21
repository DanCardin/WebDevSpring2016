import {Component} from "angular2/core";
import {Location, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {Admin} from "../admin/Admin";
import {Forms} from "../forms/Forms";
import {Home} from "../home/Home";
import {Login} from "../login/Login";
import {Profile} from "../profile/Profile";
import {Register} from "../register/Register";

@RouteConfig([
    {path: "/admin", component: Admin, name: "Admin"},
    {path: "/forms", component: Forms, name: "Forms"},
    {path: "/home", component: Home, name: "Home", useAsDefault: true},
    {path: "/login", component: Login, name: "Login"},
    {path: "/profile", component: Profile, name: "Profile"},
    {path: "/register", component: Register, name: "Register"},
])
@Component({
    selector: "app",
    templateUrl: "public/app.html",
    directives: [ROUTER_DIRECTIVES]
})
export class App {
    constructor(private location: Location) {
        this.location = location;
    }

    linkActive(path: String) {
        return this.location.path() === path;
    }
}
