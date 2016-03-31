/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

export interface IUser {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email?: String,
    phones?: [String],
    isAdmin?: boolean,
}

export let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    isAdmin: {type: String, default: true},
    phones: [String],
}, {collection: 'assignment.user'});
