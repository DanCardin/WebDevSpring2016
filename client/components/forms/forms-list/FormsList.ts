import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: "forms-list",
    templateUrl: "public/assignment/form-form.html",
})
export class FormsList implements OnInit {
    constructor(router: Router) {
        this.router = router;
    }
}
