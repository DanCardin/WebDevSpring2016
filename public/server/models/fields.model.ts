GET /api/assignment/form/:formId/field
returns an array of fields belonging to a form object whose id is equal to the formId path parameter
GET /api/assignment/form/:formId/field/:fieldId
returns a field object whose id is equal to the fieldId path parameter and belonging to a form object whose id is equal to the formId path parameter
DELETE /api/assignment/form/:formId/field/:fieldId
removes a field object whose id is equal to the fieldId path parameter and belonging to a form object whose id is equal to the formId path parameter
POST /api/assignment/form/:formId/field
creates a new field whose properties are the same as the field object embedded in the request's body and the field belongs to a form whose id is equal to the formId path parameter. The field object's id is initially null since it is a new record. The id of the new form field should be set dynamically using Node.js guid or node-uuid libraries. These will eventually be set by the database when they are inserted into a collection
PUT /api/assignment/form/:formId/field/:fieldId

declare function require(name:string);

let mock = {forms: [
    {"_id": "000", "title": "Contacts", "userId": 123, "fields": [
        {"_id": "111", "label": "First Name", "type": "TEXT", "placeholder": "First Name"},
        {"_id": "222", "label": "Last Name", "type": "TEXT", "placeholder": "Last Name"},
        {"_id": "333", "label": "Address", "type": "TEXT", "placeholder": "Address"},
        {"_id": "444", "label": "State", "type": "OPTIONS", "options": [
            {"label": "Massachussetts", "value": "MA"},
            {"label": "New Hampshire", "value": "NH"},
        ]},
        {"_id": "555", "label": "ZIP", "type": "TEXT", "placeholder": "ZIP"},
        {"_id": "666", "label": "Email", "type": "EMAIL", "placeholder": "Email"}
    ]},
    {"_id": "010", "title": "ToDo", "userId": 234, "fields": [
        {"_id": "777", "label": "Title", "type": "TEXT", "placeholder": "Title"},
        {"_id": "888", "label": "Description", "type": "TEXTAREA", "placeholder": "Title"},
        {"_id": "999", "label": "Due Date", "type": "DATE"},
    ]},
]};

export module FieldModel {
    export function getFieldsForForm(formId: number) {
        for (let i = 0; i < mock.forms.length; i++) {
            let form = mock.forms[i];
            if (form.title === title) {
                return form;
            }
        }
        return null;
    }

    export function getFieldForForm(formId: number, fieldId: number) {
        let result = [];
        for (var i = 0; i < mock.forms.length; i++) {
            var form = mock.forms[i];
            if (form.userId === userId) {
                result.push(form);
            }
        }
        return result;
    }

    export function createField(formId: number, form) {
        form.userId = userId;
        mock.forms.push(form);
        return mock.forms;
    }

    export function updateField(formId: number, fieldId: number, form: number) {
        for (var i = 0; i < mock.forms.length; i++) {
            var form = mock.forms[i];
            if (form._id === formId) {
                console.log('asdfl', form, newForm);
                for (var prop in newForm) {
                    console.log(' - ', prop, newForm[prop]);
                    form[prop] = newForm[prop];
                }
                console.log('new', form);
                return;
            }
        }
    }

    export function deleteField(formId: number, fieldId: number) {
        for (var i = 0; i < mock.forms.length; i++) {
            var form = mock.forms[i];
            if (form._id === formId) {
                mock.forms.splice(i, 1);
                return;
            }
        }
    }
}
