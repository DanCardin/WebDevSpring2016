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
        return getRestResults(url, 'majors')
        .then((majors) => {
            let result = [];
            for (var major of majors) {
                result.push(`${url}/majors/${major['ident']}`);
            }
            return result;
        })
        .mapSeries((majorUrl) => {
            return getRestResults(majorUrl, 'courses')
            .then((courses) => {
                let result = [];
                for (var course of courses) {
                    result.push(`${majorUrl}/courses/${course['ident']}`);
                }
                return result;
            });
        })
        .reduce((ret, recommends) => ret.concat(recommends))
        .mapSeries((courseUrl) => {
            return getRestResults(courseUrl, 'sections')
            .then((sections) => {
                console.log('sections', sections)
                let result = {};
                for (var section of sections) {
                    if (section && section.timeslots && section.timeslots.length) {
                        for (var slot of section.timeslots) {
                            if (result[slot.location + slot.start_time] === undefined) {
                                result[slot.location + slot.start_time] = {
                                    loc: slot.location,
                                    name: slot.location.replace(/ \d+[A-Z]?$/, ''),
                                    number: slot.location.replace(/^[a-zA-Z ]+ ?/, ''),
                                    start: slot.start_time,
                                    end: slot.end_time,
                                    seats: (section.seats || {capacity: 1}).capacity,
                                    callNumber: section.call_number,
                                    slots: [slot.day],
                                };
                            } else {
                                result[slot.location + slot.start_time].slots.push(slot.day);
                            }
                        }
                    }
                }
                console.log('result', result);
                return Object.keys(result).map(key => result[key]);
            });
        })
        .reduce((ret, recommends) => ret.concat(recommends))
        .mapSeries((slot) => {
            console.log('slot', slot)
            let options = {
                uri: `http://maps.google.com/maps/api/geocode/json?address=${slot.name}+northeastern+university,boston,ma&sensor=false&region=US`,
                json: true,
            };
            bluebird.Promise.resolve(rp(options))
            .then((res) => {
                if (res.results.length) {
                    return res.results[0].geometry.location;
                }
                return {lat: 42.340082, lng: -71.08948839999999};
            })
            .then((locatio) => {
                return RoomModel.addBuilding(slot.name, locatio.lat, locatio.lng)
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
                        let hour = Number(list[0]);
                        if (hour < 8) {
                            hour += 12;
                        }
                        let result = (new Date(2016, 1, 1, hour, Number(list[1])));
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
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    export function getSurroundingTimes(timeNumber: number, numTimes: number) {
        return bluebird.Promise.resolve(Time.find({}).sort({start: 1}).exec())
        .then((times) => {
            let preTimes = times.map(time => time.start - timeNumber);
            let firstIndex = 0;
            let map = {0: 'S', 1: 'M', 2: 'T', 3: 'W', 4: 'R', 5: 'F', 6: 'S'};

            for (var i = 0; i < preTimes.length; i++) {
                // if (times[i].days.indexOf(map[new Date().getDay()]) !== -1) {
                    if (preTimes[i] > 0) {
                        firstIndex = i;
                        break;
                    }
                // }
            }
            let returnTimes = [];
            for (var i = firstIndex - 1; i < times.length; i++) {
                // if (times[i].days.indexOf(map[new Date().getDay()]) !== -1) {
                    if (i === firstIndex - 1) {
                        returnTimes.push(times[i].start);
                    } else if (i > firstIndex - 1) {
                        if (returnTimes.indexOf(times[i].start) === -1) {
                            returnTimes.push(times[i].start);
                        }
                    }
                    if (returnTimes.length === numTimes) {
                        break;
                    }
                // }
            }
            return returnTimes;
        });
    }

    function findRoom(roomId) {
        return Room.findById(roomId).exec();
    }

    export function getBuildingsAtTime(time) {
        if (time === undefined) {
            return Building.find({}).exec();
        }
        if (time) {
            time = Number(time);
        }
        return bluebird.Promise.resolve(Time.find({'start': time}).exec())
        .then((times) => {
            let timesa = {};
            for (var time of times) {
                timesa[time.roomId] = time;
            }
            return bluebird.Promise.resolve(Room.find({'_id': {$in: Object.keys(timesa)}}).exec())
            .then(rooms => {
                let roomsa = {};
                for (var room of rooms) {
                    if (!roomsa[room.buildingId]) {
                        roomsa[room.buildingId] = [room];
                    } else {
                        roomsa[room.buildingId].push(room);
                    }
                }
                return roomsa;
            })
            .then(roomsa => {
                return bluebird.Promise.resolve(Building.find({'_id': {$in: Object.keys(roomsa)}}).exec())
                .mapSeries(building => {
                    let result = {};
                    result['lat'] = building.lat;
                    result['lng'] = building.lng;
                    result['name'] = building.name;
                    result['_id'] = building._id;
                    result['rooms'] = roomsa[building._id];
                    return result;
                })
                .catch(res => console.log(res));
            })
            .catch(res => console.log(res));
        })
        .catch(res => console.log(res));
    }

    export function getRooms() {
        return Room.find({}).exec();
    }

    export function getTimesForRoom(roomId) {
        return Time.find({roomId: roomId}).exec();
    }

    export function addBuilding(name, lat=42.340082, lng=-71.08948839999999): mongoose.Promise<mongoose.Document[]> {
        return Building.find({name : name}, (err, docs) => {
            if (!docs.length) {
                return (new Building({name: name, lat: lat, lng: lng})).save();
            } else {
                return Building.findOne({name: name}).exec();
            }
        }).exec();
    }

    export function deleteBuilding(buildingId) {
        return Building.findByIdAndRemove(buildingId).exec();
    }

    export function addRoom(buildingId=null, name=null, seats=null): mongoose.Promise<mongoose.Document[]> {
        return Room.find({buildingId: buildingId, number: name}, function (err, docs) {
            if (docs && !docs.length) {
                (new Room({buildingId: buildingId, number: name, seats: seats})).save();
            }
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
        return Time.find({roomId: time.roomId, start: time.start, end: time.end}, function (err, docs) {
            if (!docs.length) {
                return (new Time(time)).save();
            }
            return Time.findOne(
                {roomId: time.roomId, start: time.start, end: time.end, days: time.days}
            ).limit(1).exec();
        }).exec();
    }

    export function deleteTime(roomId, timeId) {
        return Time.findByIdAndRemove(timeId).exec();
    }
}
