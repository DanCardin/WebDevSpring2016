/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

let appName = 'webdevelopment';
if (process && process.env) {
    appName = process.env.OPENSHIFT_APP_NAME;
}

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
}, {collection: appName + '.field'});
