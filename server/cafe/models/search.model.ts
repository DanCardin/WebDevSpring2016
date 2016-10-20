import bluebird = require('bluebird');

import {RoomModel} from './room.model';
import {UserModel} from './user.model';

import {User} from './user.schema';
import {Room, Building} from './room.schema';

export module SearchModel {
    export function getRoomSearch(searchTerm) {
        return bluebird.Promise.resolve(Room.find({}).exec())
        .mapSeries(room => {
            if (!room.buildingName) {
                return Building.findOne({_id: room.buildingId}).exec()
                .then(building => {
                    room.buildingName = '';
                    if (building) {
                        room.buildingName = room.number + ' ' + building.name;
                    }
                    if ((room.number + ' ' + room.buildingName).toLowerCase().startsWith(searchTerm.toLowerCase())) {
                        return room;
                    }
                })
                .catch(err => console.log('serach error', err));
            }
            if ((room.number + ' ' + room.buildingName).toLowerCase().startsWith(searchTerm.toLowerCase())) {
                return room;
            }
        })
        .filter(room => {
            console.log('rooms', room)
            if (room) {
                return true;
            }
            return false;
        })
        .catch(err => console.log('serach error', err));
    }

    export function getUserSearch(searchTerm) {
        return bluebird.Promise.resolve(
            User.find({"username": {"$regex": searchTerm, "$options": "i"}}).exec()
        );
    }
}
