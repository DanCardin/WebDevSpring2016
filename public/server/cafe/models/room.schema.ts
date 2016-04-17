/// <reference path="../../../typings/main.d.ts"/>

import mongoose = require('mongoose');

let appName = 'webdevelopment';
if (process && process.env) {
    appName = process.env.OPENSHIFT_APP_NAME;
}


export let TimeSchema = new mongoose.Schema({
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true},
    start: {type: Number, ref: 'Room', required: true},
    end: {type: Number, required: true},
}, {collection: appName + 'cafe.time'});
export let Time = mongoose.model('Time', TimeSchema);


export let RoomSchema = new mongoose.Schema({
    buildingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Building'},
    number: {type: String, default: '0'},
    seats: {type: Number, default: 0},
}, {collection: appName + 'cafe.room'});
export let Room = mongoose.model('Room', RoomSchema);


export let BuildingSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    lat: {type: Number, default: 42.340082},
    lng: {type: Number, default: -71.08948839999999},
}, {collection: appName + 'cafe.building'});
export let Building = mongoose.model('Building', BuildingSchema);
