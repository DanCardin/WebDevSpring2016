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
    days: {type: Array<String>(), default: []},
}, {collection: appName + 'cafe.time'});
export let Time = mongoose.model('Time', TimeSchema);


export let RoomSchema = new mongoose.Schema({
    buildingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Building'},
    number: {type: String, default: '0'},
    seats: {type: Number, default: 0},
    times: {type: Array<Time>(), default: []},
}, {collection: appName + 'cafe.room'});
export let Room = mongoose.model('Room', RoomSchema);


export let BuildingSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    rooms: {type: Array<Room>(), default: []},
}, {collection: appName + 'cafe.building'});
export let Building = mongoose.model('Building', BuildingSchema);
