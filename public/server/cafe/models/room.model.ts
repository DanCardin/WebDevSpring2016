/// <reference path="../../../typings/main.d.ts"/>

import q = require('q');
import mongoose = require('mongoose');
import rp = require('request-promise');
import bluebird = require('bluebird');

import {Building, Room, Time} from './room.schema';

export module RoomModel {
    export function getRestResults(url, section) {
        let options = {
            uri: `${url}/${section}`,
            json: true,
        };
        return bluebird.Promise.resolve(rp(options));
    }

    export function fillRoomsFromApi() {
        let base_url = 'https://soc.courseoff.com/neu/terms';
        let result = {}

        let url = `${base_url}/201601`;
        return getRestResults(url, 'majors').then(function (majors) {
            let result = [];
            for (var major of majors) {
                result.push(`${url}/majors/${major['ident']}`);
            }
            return result.slice(0, 5);
        })
        .mapSeries(function (majorUrl) {
            return getRestResults(majorUrl, 'courses').then((courses) => {
                let result = [];
                for (var course of courses) {
                    result.push(`${majorUrl}/courses/${course['ident']}`);
                }
                return result.slice(0, 5);
                return result;
            });
        })
        .reduce((ret, recommends) => ret.concat(recommends))
        .mapSeries((courseUrl) => {
            return getRestResults(courseUrl, 'sections').then((sections) => {
                console.log('sections', sections)
                let result = [];
                for (var section of sections) {
                    if (section && section.timeslots && section.timeslots.length) {
                        for (var slot of section.timeslots) {
                            result.push({
                                loc: slot.location,
                                name: slot.location.replace(/ \d+[A-Z]?$/, ''),
                                number: slot.location.replace(/^[a-zA-Z ]+ ?/, ''),
                                start: slot.start_time,
                                end: slot.end_time,
                                seats: (section.seats || {capacity: 1}).capacity,
                                callNumber: section.call_number,
                                slots: ((slots) => {
                                    let result = {};
                                    for (var newSlot of slots) {
                                        if (slot.location === newSlot.location) {
                                            result[slot.day] = true;
                                        }
                                    }
                                    return Object.keys(result);
                                })(section.timeslots)
                            });
                        }
                    }
                }
                console.log('result', result);
                return result;
            });
        })
        .reduce((ret, recommends) => ret.concat(recommends))
        .mapSeries((slot => {
            console.log('slot', slot)
            return RoomModel.addBuilding(slot.name)
            .then((building) => {
                if (building.length) {
                    return building[0];
                }
                return building;
            })
            .catch((err) => console.log("building already exists"))
            .then((building) => {
                console.log('buillding', building)
                return RoomModel.addRoom(building._id, slot.number, slot.seats)
                .then((room) => {
                    if (room.length) {
                        return room[0];
                    }
                    return room;
                })
                .catch((err) => console.log("room already exists"));
            })
            .then((room) => {
                if (room && room.length) {
                    return;
                }
                console.log('room', room)
                let makeTime = (num) => {
                    let list = (num / 100).toString().split('.');
                    let result = (new Date(2016, 1, 1, Number(list[0]), Number(list[1])));
                    return result.getTime();
                }
                let timeslot = {
                    start: makeTime(slot.start.toString()),
                    end: makeTime(slot.end.toString()),
                    days: slot.slots,
                    roomId: room._id,
                };
                return RoomModel.addTime(timeslot)
                .then((timeslot) => {
                    console.log(`added ${slot.name}, ${timeslot}`);
                    return timeslot[0];
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }))
        .catch((err) => console.log(err));
    }

    export function getSurroundingTimes(time: number, numTimes: number) {
        return bluebird.Promise.join(
            Time.aggregate([{'$match': {'start': {'$gte': time}}}, {'$group': {'_id': '$start'}}, {'$sort': { 'start': -1}}, {'$limit': 3}]).exec(),
            Time.aggregate([{'$match': {'start': {'$lt': time}}}, {'$group': {'_id': '$start'}}, {'$sort': { 'start': 1}}, {'$limit': 2}]).exec(),
            (res, res2) => {
                res.push.apply(res, res2);
                console.log('res', res)
                return res;
            });
    }

    function findRoom(roomId) {
        return Room
            .findById(roomId)
            .exec();
    }

    export function getBuildingsAtTime(time) {
        if (time) {
            time = Number(time);
        }
        return Building.find({}).exec();
    }

    export function getRooms() {
        return Room.find({})
            .populate('Building')
            .exec();
    }

    export function getTimesForRoom(roomId) {
        return Time.findOne({roomId: roomId}).exec();
    }

    export function addBuilding(name): mongoose.Promise<mongoose.Document[]> {
        return Building.find({name : name}, function (err, docs) {
            if (!docs.length){
                return (new Building({name : name})).save();
            } else {
                return Building.findOne({name : name}).exec();
            }
        }).exec();
    }

    export function deleteBuilding(buildingId) {
        return Building.findByIdAndRemove(buildingId).exec();
    }

    export function addRoom(buildingId=null, name=null, seats=null): mongoose.Promise<mongoose.Document[]> {
        return Room.find({buildingId: buildingId, number: name}, function (err, docs) {
            if (docs && !docs.length) {
                console.log('create', buildingId, name, seats);
                (new Room({buildingId: buildingId, number: name, seats: seats})).save();
            }
            console.log('find new', buildingId, name, seats);
            return Room.findOne({buildingId: buildingId, number: name}).limit(1).exec();
        }).exec();
    }

    export function deleteRoom(roomId) {
        return Room.findByIdAndRemove(roomId).exec();
    }

    export function editRoom(roomId, update) {
        return Room.findByIdAndUpdate(roomId, update, {new: true}).exec();
    }

    export function addTime(time) {
        console.log('add time', time);
        return Time.find({roomId: time.roomId, start: time.start, end: time.end}, function (err, docs) {
            console.log('docssssslli', docs);
            if (!docs.length) {
                return (new Time(time)).save();
            }
            return Time.findOne({roomId: time.roomId, start: time.start, end: time.end}).limit(1).exec();
        }).exec();
    }

    export function deleteTime(roomId, timeId) {
        return Time.findByIdAndRemove(timeId).exec();
    }
}
