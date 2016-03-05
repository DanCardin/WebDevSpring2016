import {Component} from "angular2/core";
import {RouteConfig, Router, RouterOutlet} from "angular2/router";

import {Admin} from "../admin/admin.component";
import {Forms} from "../forms/forms.component";
import {Header} from "../header/header.component";
import {Home} from "../home/home.component";
import {Login} from "../login/login.component";
import {Profile} from "../profile/profile.component";
import {Room} from "../room/room.component";
import {Sidebar} from "../sidebar/sidebar.component";

import {RoomService} from "../../services/RoomService";
import {UserService} from "../../services/UserService";

@RouteConfig([
    {path: "/admin", component: Admin, name: "Admin"},
    {path: "/forms/...", component: Forms, name: "Forms"},
    {path: "/home", component: Home, name: "Home", useAsDefault: true},
    {path: "/login", component: Login, name: "Login"},
    {path: "/profile", component: Profile, name: "Profile"},
    {path: "/room", component: Room, name: "Room"},
])
@Component({
    selector: "cafe",
    templateUrl: "cafe/components/cafe/cafe.view.html",
    directives: [RouterOutlet, Header],
    providers: [RoomService, UserService],
})
export class CafeComponent {}
