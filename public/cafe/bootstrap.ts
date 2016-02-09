import {bootstrap} from "angular2/platform/browser";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";

import {CafeComponent} from "./cafe.component";
import {UserService} from "./services/UserService";
import {RoomService} from "./services/RoomService";

bootstrap(CafeComponent, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    UserService,
    RoomService,
]);
