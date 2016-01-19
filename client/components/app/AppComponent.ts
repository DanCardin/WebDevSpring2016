import {Component} from "angular2/core";
import {Router, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {AdminComponent} from "../admin/AdminComponent";
import {HomeComponent} from "../home/HomeComponent";
import {LoginComponent} from "../login/LoginComponent";
import {ProfileComponent} from "../profile/ProfileComponent";
import {RegisterComponent} from "../register/RegisterComponent";

@RouteConfig([
    {path: "/", component: HomeComponent, as: "Home"},
    {path: "/admin", component: AdminComponent, as: "Admin"},
    {path: "/login", component: LoginComponent, as: "Login"},
    {path: "/profile", component: ProfileComponent, as: "Profile"},
    {path: "/register", component: RegisterComponent, as: "Register"},
])
@Component({
    selector: "my-app",
    template: "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {

    constructor() {
        console.log("We are up and running!");
    }

}
