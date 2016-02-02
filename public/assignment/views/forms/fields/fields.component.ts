import {Component, OnInit} from "angular2/core";

import {Form, IForm, FormService} from "../../../services/FormService";
import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "fields-list",
    templateUrl: "app/views/forms/fields/fields.view.html",
})
export class FieldsList {
    shown: boolean = false;
    forms: Array<IForm>;

    constructor(
        private _formService: FormService,
        private _userService: UserService
    ) {
    }
}
