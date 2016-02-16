import {bootstrap} from "angular2/platform/browser";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";
import {JSONP_PROVIDERS} from 'angular2/http';

import {CafeComponent} from "./components/cafe/cafe.component";
import {UserService} from "./services/UserService";
import {RoomService} from "./services/RoomService";
import {SearchService} from "./services/SearchService";

bootstrap(CafeComponent, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    JSONP_PROVIDERS,
    UserService,
    RoomService,
    SearchService
]);
