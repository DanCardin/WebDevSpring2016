/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

import {FieldSchema} from './field.schema';

export interface IForm {
    userId: String,
    title: String,
    created: Date,
    updated: Date,
}

export let FormSchema = new mongoose.Schema({
    userId: String,
    title: String,
    fields: {type: [FieldSchema], default: []},
    created: Date,
    updated: Date,
}, {collection: 'assignment.form'});
