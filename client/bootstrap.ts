import {bootstrap} from "angular2/platform/browser";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS} from "angular2/router";

import {App} from "./components/app/App";

bootstrap(App, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
]);
