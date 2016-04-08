/// <reference path="../../../typings/main.d.ts"/>

import q = require('q');
import mongoose = require('mongoose');

import {Building, Room, Time} from './room.schema';

export module RoomModel {
    export function getSurroundingTimes(time: number, numTimes: number) {
        return Time
            .find({ratio: {$lte: time}})
            .sort({time: -1})
            .limit(2)
            .exec()
            .then((res) => {
                return res.push.apply(Time.find({ratio: {$gt: time}}).sort({ratio: 1}).limit(3));
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

    export function addBuilding(buildingName) {
        let newBuilding = {
            name: buildingName,
        };
        return (new Building(newBuilding)).save();
    }

    export function deleteBuilding(buildingId) {
        return Building.findByIdAndRemove(buildingId).exec();
    }

    export function addRoom() {
        return (new Room()).save();
    }

    export function deleteRoom(roomId) {
        return Room.findByIdAndRemove(roomId);
    }

    export function editRoom(roomId: number, update) {
        let updatedRoom = {};
        for (var building of mock.buildings) {
            for (var room of building.rooms) {
                if (room._id === roomId) {
                    room.building = update.building;
                    room.number = update.number;
                    updatedRoom = room;
                }
            }
        }
        return getRooms();
    }

    export function addTime(roomId, time) {
        let result = [];
        for (var building of mock.buildings) {
            for (var room of building.rooms) {
                if (room._id === roomId) {
                    let newTime = {
                        _id: (new Date()).getTime(),
                        start: new Date(time.start).getTime(),
                        end: new Date(time.end).getTime(),
                        days: time.days,
                    }
                    room.times.push(newTime);
                    result = room.times;
                }
            }
        }
        return result;
    }

    export function deleteTime(roomId, timeId) {
        let result = [];
        for (var building of mock.buildings) {
            for (var room of building.rooms) {
                if (room._id === roomId) {
                    for (var i = 0; i < room.times.length; i++) {
                        if (room.times[i]._id === timeId) {
                            room.times.splice(i, 1);
                            result = room.times;
                        }
                    }
                }
            }
        }
        return result;
    }
}
