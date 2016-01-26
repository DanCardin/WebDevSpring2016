import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: "forms-list",
    templateUrl: "app/forms/form-list/form-list.view.html",
})
export class FormsList implements OnInit {
    constructor(router: Router) {
        this.router = router;
    }
}
