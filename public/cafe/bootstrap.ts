/// <reference path="typings/main.d.ts"/>

import {bootstrap} from "angular2/platform/browser";
import {provide} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";
import {JSONP_PROVIDERS, HTTP_BINDINGS, Http} from 'angular2/http';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';

import {CafeComponent} from "./components/cafe/cafe.component";
import {UserService} from "./services/UserService";
import {RoomService} from "./services/RoomService";

bootstrap(CafeComponent, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    JSONP_PROVIDERS,
    HTTP_BINDINGS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerPrefix: 'JWT',
                tokenName: 'jwt',
            }), http);
        },
        deps: [Http]
    }),
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    UserService,
    RoomService,
]);
