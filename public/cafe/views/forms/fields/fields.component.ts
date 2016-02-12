import {Component, OnInit} from "angular2/core";

import {Form, IForm, RoomService} from "../../../services/RoomService";
import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "fields-list",
    templateUrl: "cafe/views/forms/fields/fields.view.html",
})
export class FieldsList {
    shown: boolean = false;
    forms: Array<IForm>;

    constructor(
        private _formService: RoomService,
        private _userService: UserService
    ) {
    }
}
