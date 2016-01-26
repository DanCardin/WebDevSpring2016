import {Component} from "angular2/core";
import {RouteConfig, Router, RouterOutlet} from "angular2/router";

import {Admin} from "app/admin/admin.component";
import {Forms} from "app/forms/forms.component";
import {Home} from "app/home/home.component";
import {Login} from "app/login/login.component";
import {Profile} from "app/profile/profile.component";
import {Register} from "app/register/register.component";
import {Header} from "app/header/header.component";
import {Sidebar} from "app/sidebar/sidebar.component";

import {UserService} from "app/services/UserService";

@RouteConfig([
    {path: "/admin", component: Admin, name: "Admin"},
    {path: "/forms/...", component: Forms, name: "Forms"},
    {path: "/home", component: Home, name: "Home", useAsDefault: true},
    {path: "/login", component: Login, name: "Login"},
    {path: "/profile", component: Profile, name: "Profile"},
    {path: "/register", component: Register, name: "Register"},
])
@Component({
    selector: "app",
    templateUrl: "app/app/app.view.html",
    directives: [RouterOutlet, Register, Header, Sidebar],
    providers: [UserService],
})
export class FormBuilderApp {}
