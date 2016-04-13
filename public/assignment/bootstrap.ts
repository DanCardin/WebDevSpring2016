/// <reference path="typings/main.d.ts"/>

import {bootstrap} from "angular2/platform/browser";
import {provide} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';


import {FormBuilderApp} from "./views/app/app.component";
import {FieldService} from "./services/FieldService";
import {FormService} from "./services/FormService";
import {UserService} from "./services/UserService";

bootstrap(FormBuilderApp, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerPrefix: 'JWT',
                tokenName: 'jwt',
            }), http);
        },
        deps: [Http]
    }),
    UserService,
    FormService,
    FieldService,
]);
