/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

import {IField, FieldSchema} from './field.schema';

let Field = mongoose.model('Field', FieldSchema);

export module FieldModel {
    export function getFieldsForForm(formId) {
        return Field.find({formId: formId}).exec();
    }

    export function getFieldForForm(formId, fieldId) {
        return Field.find({fieldId: fieldId, formId: formId}).exec();
    }

    export function createField(formId, newField) {
        let field: IField = {
            formId: formId,
            label: newField.label,
            type: newField.type,
            placeholder: newField.placeholder,
            options: newField.options,
        };
        return (new Field(field)).save();
    }

    export function updateField(formId, fieldId, update) {
        return Field.findByIdAndUpdate(fieldId, update, {new: true}).exec();
    }

    export function deleteField(formId, fieldId) {
        return Field.findByIdAndRemove(fieldId).exec();
    }
}
