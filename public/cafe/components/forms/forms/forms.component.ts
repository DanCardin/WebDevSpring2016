import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "forms-list",
    templateUrl: "cafe/components/forms/forms/forms.view.html",
})
export class FormsList {
    constructor(
        private _userService: UserService,
        private router: Router
    ) {
    }
}
