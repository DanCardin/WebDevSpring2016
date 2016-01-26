import {Component, OnInit} from "angular2/core";

@Component({
    selector: "fields-list",
    templateUrl: "app/forms/form-fields/form-fields.view.html",
})
export class FieldsList implements OnInit {
    shown: boolean = false;

    constructor() {
    }

    select() {
        if (!this.shown) {
            $("#datetimepicker").datetimepicker();
            $("#datetimepicker").data("DateTimePicker").show();
            this.shown = true;
        }
    }
}
