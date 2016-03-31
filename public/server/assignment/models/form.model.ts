/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

import {IForm, FormSchema} from './form.schema';

let Form = mongoose.model('Form', FormSchema);

export module FormModel {
    export function findFormByTitle(title) {
        return Form.findOne({title: title}).exec();
    }

    export function createForm(userId, newForm) {
        let form: IForm = {
            userId: newForm.userId,
            title: newForm.title,
            created: new Date(),
            updated: new Date(),
        };
        return (new Form(form)).save();
    }

    export function getAllForms(userId) {
        return Form.find({userId: userId}).exec();
    }

    export function findFormById(formId) {
        return Form.findOne({_id: formId}).exec();
    }

    export function updateForm(formId, newForm) {
        return Form.findByIdAndUpdate(formId, newForm, {new: true}).exec();
    }

    export function deleteForm(formId) {
        return Form.findByIdAndRemove(formId).exec();
    }
}
