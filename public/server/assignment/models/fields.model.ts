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
        let fields = mock.fields[formId];
        if (!fields) {
            return [];
        }
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (field._id === fieldId) {
                return field;
            }
        }
        return [];
    }

    export function createField(formId: number, field) {
        field._id = (new Date()).getTime();
        if (mock.fields.hasOwnProperty(formId.toString())) {
            mock.fields[formId].push(field);
        } else {
            mock.fields[formId] = [field];
        }
        return mock.fields[formId];
    }

    export function updateField(formId: number, fieldId: number, newField) {
        console.log('uapdstaisn')
        let fields = mock.fields[formId];
        if (!fields) {
            return [];
        }
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            console.log('old', field, formId, field._id === formId)
            if (field._id === fieldId) {
                console.log('new', newField)
                for (var prop in newField) {
                    field[prop] = newField[prop];
                }
                console.log('asdf', field)
                return [];
            }
        }
    }

    export function deleteField(formId: number, fieldId: number) {
        let fields = mock.fields[formId];
        if (!fields) {
            return [];
        }
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (field._id === fieldId) {
                fields.splice(i, 1);
                return [];
            }
        }
    }
}
