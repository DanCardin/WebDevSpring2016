let mock = {
    fields: {
        234: [],
    }
}

export module FieldModel {
    export function getFieldsForForm(formId: number) {
        let fields = mock.fields[formId];
        if (fields) {
            return fields;
        }
        return [];
    }

    export function getFieldForForm(formId: number, fieldId: number) {
        let result = [];
        for (var i = 0; i < mock.fields.length; i++) {
            var form = mock.forms[i];
            if (form.userId === userId) {
                result.push(form);
            }
        }
        return result;
    }

    export function createField(formId: number, field) {
        field._id = (new Date()).getTime();
        if (mock.fields.hasOwnProperty(formId)) {
            mock.fields[formId].push(field);
        } else {
            mock.fields[formId] = [field];
        }
        return mock.fields[formId];
    }

    export function updateField(formId: number, fieldId: number, field: number) {
        for (var i = 0; i < mock.fields.length; i++) {
            var field = mock.fields[i];
            if (field._id === formId) {
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
        let fields = mock.fields[formId];
        if (!fields) {
            return;
        }
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (field._id === fieldId) {
                fields.splice(i, 1);
                return;
            }
        }
    }
}
