import {
    Component, Directive, Attribute, ElementRef, DynamicComponentLoader
} from "angular2/core";
import {RouteConfig, Router, RouterOutlet, ComponentInstruction} from "angular2/router";
import {PromiseWrapper} from 'angular2/src/facade/async';


import {Admin} from "../admin/admin.component";
import {Forms} from "../forms/forms.component";
import {Home} from "../home/home.component";
import {Login} from "../login/login.component";
import {Profile} from "../profile/profile.component";
import {Register} from "../register/register.component";
import {Header} from "../header/header.component";
import {Sidebar} from "../sidebar/sidebar.component";

import {FormService} from "../../services/FormService";
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
    // The Boolean following each route below denotes whether the route requires authentication to view
    this.publicRoutes = {
      'login': true,
      'register': true
    };
  }

  activate(instruction: ComponentInstruction) {
    let url = instruction.urlPath;
    if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
      // todo: redirect to Login, may be there a better way?
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}

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
    templateUrl: "assignment/views/app/app.view.html",
    directives: [LoggedInRouterOutlet, Register, Header, Sidebar],
    providers: [FormService, UserService],
})
export class FormBuilderApp {}
