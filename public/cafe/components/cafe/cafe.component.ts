import {
    Component, Directive, Attribute, ElementRef, DynamicComponentLoader
} from "angular2/core";
import {RouteConfig, Router, RouterOutlet, ComponentInstruction} from "angular2/router";
import {PromiseWrapper} from 'angular2/src/facade/async';

import {Admin} from "../admin/admin.component";
import {Header} from "../header/header.component";
import {Home} from "../home/home.component";
import {Login} from "../login/login.component";
import {Profile} from "../profile/profile.component";
import {Room} from "../room/room.component";

import {RoomService} from "../../services/RoomService";
import {UserService} from "../../services/UserService";


@Directive({
  selector: 'logged-in-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {'login': true };
  }

  activate(instruction: ComponentInstruction) {
    let url = instruction.urlPath;
    if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}


@RouteConfig([
    {path: "/admin/...", component: Admin, name: "Admin"},
    {path: "/home", component: Home, name: "Home", useAsDefault: true},
    {path: "/login", component: Login, name: "Login"},
    {path: "/profile", component: Profile, name: "Profile"},
    {path: "/room", component: Room, name: "Room"},
])
@Component({
    selector: "cafe",
    templateUrl: "cafe/components/cafe/cafe.view.html",
    directives: [LoggedInRouterOutlet, Header],
    providers: [RoomService, UserService],
})
export class CafeComponent {
    constructor(private userService: UserService) {}
}
