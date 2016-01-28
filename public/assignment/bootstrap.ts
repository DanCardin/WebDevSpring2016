import {bootstrap} from "angular2/platform/browser";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";

import {FormBuilderApp} from "./app.component";
import {FormService} from "./services/FormService";
import {UserService} from "./services/UserService";

bootstrap(FormBuilderApp, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    UserService,
    FormService,
]);
