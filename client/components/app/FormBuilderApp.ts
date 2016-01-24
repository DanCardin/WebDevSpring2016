import {Component} from "angular2/core";
import {RouteConfig, Router, RouterOutlet} from "angular2/router";

import {Admin} from "../admin/Admin";
import {Forms} from "../forms/Forms";
import {Home} from "../home/Home";
import {Login} from "../login/Login";
import {Profile} from "../profile/Profile";
import {Register} from "../register/Register";
import {Header} from "../header/Header";
import {Sidebar} from "../sidebar/Sidebar";

@RouteConfig([
    {path: "/admin", component: Admin, name: "Admin"},
    {path: "/forms/...", component: Forms, name: "Forms"},
    {path: "/home", component: Home, name: "Home", useAsDefault: true},
    {path: "/login", component: Login, name: "Login"},
    {path: "/profile", component: Profile, name: "Profile"},
    {path: "/register", component: Register, name: "Register"},
])
@Component({
    directives: [RouterOutlet, Register, Header, Sidebar],
    selector: "app",
    templateUrl: "public/app.html",
})
export class FormBuilderApp {}
