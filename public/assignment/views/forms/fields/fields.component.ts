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

    updateField(field, fieldSelect, labelField, placeholderField, optionsField) {
        this.fieldService.selectedField = field;
        this.selectedFieldType = field.type;
        console.log('asdf', field.type)

        fieldSelect.value = field.type;
        labelField.value = field.label;
        placeholderField.value = field.placeholder;
        let options = '';
        field.options.forEach(option => {
            options += option.label + ':' + option.value + '\n';
        });
        optionsField.value = options;
    }

    addField(select, label, placeholder, options) {
        if (!this.formService.currentForm) {
            return;
        }
        let field = {
            'type': select.value,
            'label': label.value,
            'options': [],
        };

        if (this.fieldTypes[0] == select.value) {
            // Single Line Text
            field['placeholder'] = placeholder.value;
        } else if (this.fieldTypes[1] == select.value) {
            // Date
        } else if (this.fieldTypes[2] == select.value ||
                   this.fieldTypes[3] == select.value ||
                   this.fieldTypes[4] == select.value) {
            // Dropdown
            field['options'] = [];
            options.value.split('\n').forEach(line => {
                let kv = line.split(':');
                field['options'].push({
                    'label': kv[0],
                    'value': kv[1],
                });
            });
        } else if (this.fieldTypes[5] == select.value) {
            // Multi Line Text Field
            field['placeholder'] = placeholder.value;
        }

        if (this.fieldService.selectedField) {
            let selectedField = this.fieldService.selectedField._id;
            this.fieldService.selectedField = null;
            this.fieldService.updateFormById(
                this.formService.currentForm._id,
                selectedField,
                field
            ).subscribe();
        } else {
            this.fieldService.createFieldForForm(this.formService.currentForm._id, field).subscribe();
        }
        this.fields = this.fieldService.getFieldsForForm(this.formService.currentForm._id);
    }

    removeField(field) {
        this.fieldService.deleteFormById(this.formService.currentForm._id, field._id).subscribe();
        this.fields = this.fieldService.getFieldsForForm(this.formService.currentForm._id);
    }
}
