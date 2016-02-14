import {Component} from "angular2/core";
import {RouteConfig, Router, RouterOutlet} from "angular2/router";

import {Admin} from "./views/admin/admin.component";
import {Forms} from "./views/forms/forms.component";
import {Home} from "./views/home/home.component";
import {Login} from "./views/login/login.component";
import {Profile} from "./views/profile/profile.component";
import {Register} from "./views/register/register.component";
import {Header} from "./views/header/header.component";
import {Sidebar} from "./views/sidebar/sidebar.component";

import {FormService} from "./services/FormService";
import {UserService} from "./services/UserService";

@RouteConfig([
    {path: '/admin', component: Admin, name: "Admin"},
    {path: "/forms/...", component: Forms, name: "Forms"},
    {path: "/home", component: Home, name: "Home", useAsDefault: true},
    {path: "/login", component: Login, name: "Login"},
    {path: "/profile", component: Profile, name: "Profile"},
    {path: "/register", component: Register, name: "Register"},
])
@Component({
    selector: "app",
    templateUrl: "app/app.view.html",
    directives: [RouterOutlet, Register, Header, Sidebar],
    providers: [FormService, UserService],
})
export class FormBuilderApp {}
