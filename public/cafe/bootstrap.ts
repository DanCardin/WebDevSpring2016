/// <reference path="typings/main.d.ts"/>

import {bootstrap} from "angular2/platform/browser";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";
import {JSONP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

import {CafeComponent} from "./components/cafe/cafe.component";
import {UserService} from "./services/UserService";
import {RoomService} from "./services/RoomService";

bootstrap(CafeComponent, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    JSONP_PROVIDERS,
    HTTP_BINDINGS,
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    UserService,
    RoomService,
]);
