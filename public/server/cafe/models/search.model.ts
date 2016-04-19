import bluebird = require('bluebird');

import {RoomModel} from './room.model';
import {UserModel} from './user.model';

import {User} from './user.schema';
import {Room} from './room.schema';

export module SearchModel {
    export function getRoomSearch(searchTerm) {
        return bluebird.Promise.resolve(Room.find({}).exec())
        .mapSeries(room => {
            if ((room.number + ' ' + room.buildingName).toLowerCase().startsWith(searchTerm.toLowerCase())) {
                return room;
            }
        })
        .filter(room => {
            if (room) {
                return true;
            }
            return false;
        })
        return bluebird.Promise.resolve(
            Room.find({"number": {"$regex": searchTerm, "$options": "i"}}).exec()
        );
    }

    export function getUserSearch(searchTerm) {
        return bluebird.Promise.resolve(
            User.find({"username": {"$regex": searchTerm, "$options": "i"}}).exec()
        );
    }
}
