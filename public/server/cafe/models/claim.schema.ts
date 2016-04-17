/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

let appName = 'webdevelopment';
if (process && process.env) {
    appName = process.env.OPENSHIFT_APP_NAME;
}

export let ClaimSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    building: {type: String, required: true},
    time: {type: String, required: true},
}, {collection: appName + 'cafe.claim'});
export let Claim = mongoose.model('Claim', ClaimSchema);
