/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

let appName = 'webdevelopment';
if (process && process.env) {
    appName = process.env.OPENSHIFT_APP_NAME;
}

export let ClaimSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    buildingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true},
    timeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Time', required: true},
}, {collection: appName + 'cafe.claim'});
export let Claim = mongoose.model('Claim', ClaimSchema);
