import {Component, OnInit} from "angular2/core";

@Component({
    selector: "fields-list",
    templateUrl: "public/assignment/form-fields.html",
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
