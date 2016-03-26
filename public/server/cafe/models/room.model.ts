export module RoomModel {
    function findBuildingIndex(buildingId: number) {
        for (var i = 0; i < mock.buildings.length; i++) {
            if (mock.buildings[i]._id === buildingId) {
                return i;
            }
        }
    }

    export function getSurroundingTimes(time: Date, numTimes) {
        let result = [];
        let half = Math.floor(numTimes / 2);
        for (let i = -half; i <= half; i++) {
            let cur = 1458923637117 + 1000;
            result.push(cur);
        }
        return result;
    }

    function findRoom(roomId) {
        let result = {};
        mock.buildings.forEach((building) => {
            building.rooms.forEach((room) => {
                if (room._id === roomId) {
                    result = room;
                    return;
                }
            });
        });
        return result;
    }

    export function getBuildingsAtTime(time: Date) {
        return mock.buildings;
    }

    export function getBuildings() {
        return mock.buildings;
    }

    export function getRooms() {
        let rooms = [];
        mock.buildings.forEach((building) => {
            building.rooms.forEach((room) => {
                rooms.push(room);
            });
        });
        return rooms;
    }

    export function getTimesForRoom(roomId) {
        let room = findRoom(roomId);
        if (room) {
            return room.times;
        }
        return [];
    }

    export function addBuilding(buildingName) {
        let building = {_id: (new Date()).getTime(), name: buildingName, rooms: []};
        mock.buildings.push(building);
        return mock.buildings;
    }

    export function deleteBuilding(buildingId: number) {
        mock.buildings.splice(findBuildingIndex(buildingId), 1);
        return mock.buildings;
    }

    export function addRoom() {
        let building = mock.buildings[0];
        let room = {_id: (new Date()).getTime(), building: building.name, number: 0, times: []}
        mock.buildings[findBuildingIndex(building._id)].rooms.push(room);
        return getRooms();
    }

    export function deleteRoom(roomId: number) {
        for (var building of mock.buildings) {
            for (var i = 0; i < building.rooms.length; i++) {
                if (building.rooms[i]._id === roomId) {
                    building.rooms.splice(i, 1);
                    break;
                }
            }
        }
        return getRooms();
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

    function addTime(room, startTime: string, endTime: string, days) {
        room.times.push({
            start: new Date(this.convertTimeToDateString(startTime)),
            end: new Date(this.convertTimeToDateString(endTime)),
            days: days,
        });
    }

    function deleteTime(room, startTime, endTime) {
        for (var i = 0; i < room.times.length; i++) {
            if (room.times[i].start === startTime && room.times[i].end === endTime) {
                room.time.splice(i, 1);
            }
        }
    }

    export function getData() {
        return mock;
    }

    var mock = { buildings: [
    {
        _id: 1,
        name: 'Shillman',
        rooms: [
            {
                _id: 1, building: 'Shillman',
                number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                _id: 2, building: 'Shillman',
                number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {_id: 1, start: 1458923637117, end: 1458923637117, days: ['M', 'W', 'R']},
                ],
            },
            {
                _id: 3, building: 'Shillman',
                number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                _id: 4, building: 'Shillman',
                number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {_id: 2, start: 1458923637117, end: 1458923637117, days: ['M', 'T']},
                    {_id: 3, start: 1458923637117, end: 1458923637117, days: ['T', 'F']},
                ],
            },
        ],
    },
    {
        _id: 2,
        name: 'Snell',
        rooms: [
            {
                _id: 5, building: 'Snell',
                number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {_id: 4, start: 1458923637117, end: 1458923637117, days: ['M', 'T']},
                    {_id: 5, start: 1458923637117, end: 1458923637117, days: ['M', 'T']},
                    {_id: 6, start: 1458923637117, end: 1458923637117, days: ['M', 'T']},
                    {_id: 7, start: 1458923637117, end: 1458923637117, days: ['M', 'T']},
                ],
            },
            {
                _id: 6, building: 'Snell',
                number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                _id: 7, building: 'Snell',
                number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                _id: 8, building: 'Snell',
                number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
        ],
    },
    {
        _id: 3,
        name: 'Ryder',
        rooms: [
            {
                _id: 9, building: 'Ryder',
                number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                _id: 10, building: 'Ryder',
                number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                _id: 11, building: 'Ryder',
                number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                _id: 12, building: 'Ryder',
                number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {_id: 8, start: 1458923637117, end: 1458923637117},
                ],
            },
        ],
    },
    ]};
}
