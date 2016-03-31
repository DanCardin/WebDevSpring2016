/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

export interface IField {
    formId: String,
    label: String,
    type: String,
    placeholder: String,
    options: Array<{label: String, value: String}>,
}

export let FieldSchema = new mongoose.Schema({
    formId: String,
    label: String,
    type: String,
    placeholder: String,
    options: [{label: String, value: String}]
}, {collection: 'assignment.field'});
