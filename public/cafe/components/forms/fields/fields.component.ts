import {Component, OnInit} from "angular2/core";

import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "fields-list",
    templateUrl: "cafe/components/forms/fields/fields.view.html",
})
export class FieldsList {
    shown: boolean = false;

    constructor(
        private _userService: UserService
    ) {
    }
}
