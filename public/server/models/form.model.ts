declare function require(name:string);

// var mock = require('./form.mock.json');
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

export module FormModel {
    export function findFormByTitle(title) {
        for (let i = 0; i < mock.forms.length; i++) {
            let form = mock.forms[i];
            if (form.title === title) {
                return form;
            }
        }
        return null;
    }

    export function createForm(userId: number, form) {
        form.userId = userId;
        mock.forms.push(form);
        return mock.forms;
    }

    export function getAllForms(userId: number) {
        let result = [];
        for (var i = 0; i < mock.forms.length; i++) {
            var form = mock.forms[i];
            if (form.userId === userId) {
                result.push(form);
            }
        }
        return result;
    }

    export function findFormById(id) {
        for (var i = 0; i < mock.forms.length; i++) {
            var form = mock.forms[i];
            if (form._id === id) {
                return form;
            }
        }
        return null;
    }

    export function updateForm(formId, newForm) {
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

    export function deleteForm(formId) {
        for (var i = 0; i < mock.forms.length; i++) {
            var form = mock.forms[i];
            if (form._id === formId) {
                mock.forms.splice(i, 1);
                return;
            }
        }
    }
}
