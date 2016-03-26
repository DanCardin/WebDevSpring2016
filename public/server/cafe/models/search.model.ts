import RoomModel = require('./room.model');
import UserModel = require('./user.model');

export module SearchModel {
    export function getRoomSearch(searchTerm) {
        let result = {};
        for (var building of RoomModel.RoomModel.getData().buildings) {
            result[building.name] = [building.name];
            for (var room of building.rooms) {
                let wholeName = room.number + ' ' + building.name;
                result[wholeName] = [wholeName];
                result[building.name].push(wholeName);
            }
        }
        let starts = Object.keys(result);
        let results = [];
        for (var i = 0; i < starts.length; i++) {
            let key: string = starts[i];
            if (key.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                results.push.apply(results, result[starts[i]]);
            }
        }
        for (var r = 0; r < results.length; r++) {
            results[r] = results[r].replace(/\s+/g, '');
        }
        return results;
    }

    export function getUserSearch(searchTerm) {
        let result = {};
        for (var user of UserModel.UserModel.getData().users) {
            result[user.username] = [user.username];
        }
        let starts = Object.keys(result);
        let results = [];
        for (var i = 0; i < starts.length; i++) {
            let key: string = starts[i];
            if (key.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                results.push.apply(results, result[starts[i]]);
            }
        }
        return results;
    }
}
