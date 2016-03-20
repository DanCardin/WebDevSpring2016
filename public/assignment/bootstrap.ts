import {bootstrap} from "angular2/platform/browser";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";

import {FormBuilderApp} from "./app.component";
import {FieldService} from "./services/FieldService";
import {FormService} from "./services/FormService";
import {UserService} from "./services/UserService";

bootstrap(FormBuilderApp, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    HTTP_PROVIDERS,
    UserService,
    FormService,
    FieldService,
]);
