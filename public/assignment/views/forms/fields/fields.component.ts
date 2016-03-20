import {Component, OnInit} from "angular2/core";

import {FieldService} from "../../../services/FieldService";
import {FormService} from "../../../services/FormService";
import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "fields-list",
    templateUrl: "assignment/views/forms/fields/fields.view.html",
})
export class FieldsList {
    private fieldTypes = [
        'Single Line Text', 'Date', 'Dropdown', 'Checkbox', 'Radio Buttons',
        'Paragraph Text Field'
    ];
    private selectedFieldType = this.fieldTypes[0];
    private fields;

    constructor(
        private fieldService: FieldService,
        private formService: FormService,
        private userService: UserService
    ) {
        if (this.formService.currentForm) {
            this.fields = this.fieldService.getFieldsForForm(this.formService.currentForm._id);
        }
    }

    selectField(value) {
        this.selectedFieldType = value;
    }

    addField(select, label, placeholder, options) {
        if (!this.formService.currentForm) {
            return;
        }
        let field = {
            '_id': null,
            'type': select.value,
            'label': label.value,
            'options': [],
        };

        if (this.fieldTypes[0] == select.value) {
            // Single Line Text
            field['placeholder'] = placeholder.value;
        } else if (this.fieldTypes[1] == select.value) {
            // Date
        } else if (this.fieldTypes[2] == select.value) {
            // Dropdown
            field['options'] = [
                {'label': 'Option 1', 'value': 'OPTION_1'},
                {'label': 'Option 2', 'value': 'OPTION_2'},
                {'label': 'Option 3', 'value': 'OPTION_3'}
            ];
        } else if (this.fieldTypes[3] == select.value) {
            // Checkboxes Field
            field['options'] = [
                {'label': 'Option 1', 'value': 'OPTION_1'},
                {'label': 'Option 2', 'value': 'OPTION_2'},
                {'label': 'Option 3', 'value': 'OPTION_3'}
            ];
        } else if (this.fieldTypes[4] == select.value) {
            // Radio Buttons Field
            field['options'] = [
                {'label': 'Option 1', 'value': 'OPTION_1'},
                {'label': 'Option 2', 'value': 'OPTION_2'},
            ];
        } else if (this.fieldTypes[5] == select.value) {
            // Multi Line Text Field
            field['placeholder'] = placeholder.value;
        }
        this.fieldService.createFieldForForm(this.formService.currentForm._id, field).subscribe();
        this.fields = this.fieldService.getFieldsForForm(this.formService.currentForm._id);
    }

    removeField(field) {
        this.fieldService.deleteFormById(this.formService.currentForm._id, field._id).subscribe();
        this.fields = this.fieldService.getFieldsForForm(this.formService.currentForm._id);
    }
}
