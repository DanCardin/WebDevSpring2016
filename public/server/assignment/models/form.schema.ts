/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

import {FieldSchema} from './field.schema';

export interface IForm {
    label: String,
    type: String,
    placeholder: String,
    options: Array<{label: String, value: String}>,
}

export let FormSchema = new mongoose.Schema({
    userId: String,
    title: String,
    fields: [FieldSchema],
    created: Date,
    updated: Date,
}, {collection: 'assignment.user'});
