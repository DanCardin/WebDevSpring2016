import {Router} from "angular2/router";

export class PathAware {
    constructor(private router: Router) {
        this.router = router;
    }

    linkActive(path: String) {
        return this.router.isRouteActive(this.router.generate([path]));
    }
}
