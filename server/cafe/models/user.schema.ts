/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

let appName = 'webdevelopment';
if (process && process.env) {
    appName = process.env.OPENSHIFT_APP_NAME;
}

export let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
}, {collection: appName + 'cafe.user'});
export let User = mongoose.model('CafeUser', UserSchema);
