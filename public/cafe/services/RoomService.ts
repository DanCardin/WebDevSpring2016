// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
// import {moment} from 'moment/moment';
declare var moment: any;

export class Building {
    public name;
    public rooms;
    public building;
    constructor(name: string, rooms: Array<any>) {
        this.name = name;
        this.rooms = rooms;
        this.building = null;
    }
}

@Injectable()
export class RoomService {
    private _buildings = [
        new Building(
            'Shillman',
            [
                {
                    number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [],
                },
                {
                    number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [
                        {start: new Date(), end: new Date(), days: ['M', 'W', 'R']},
                    ],
                },
                {
                    number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [],
                },
                {
                    number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [
                        {start: new Date(), end: new Date(), days: ['M', 'T']},
                        {start: new Date(), end: new Date(), days: ['T', 'F']},
                    ],
                },
            ]
        ),
        new Building(
            'Snell',
            [
                {
                    number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [
                        {start: new Date(), end: new Date(), days: ['M', 'T']},
                        {start: new Date(), end: new Date(), days: ['M', 'T']},
                        {start: new Date(), end: new Date(), days: ['M', 'T']},
                        {start: new Date(), end: new Date(), days: ['M', 'T']},
                    ],
                },
                {
                    number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [],
                },
                {
                    number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [],
                },
                {
                    number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [],
                },
            ]
        ),
        new Building(
            'Ryder',
            [
                {
                    number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [
                    ],
                },
                {
                    number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [
                    ],
                },
                {
                    number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [
                    ],
                },
                {
                    number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                    times: [
                        {start: new Date(), end: new Date()},
                    ],
                },
            ]
        ),
    ];

    constructor() {}

    private findBuildingIndex(name: string) {
        for (var i = 0; i < this._buildings.length; i++) {
            if (this._buildings[i].name === name) {
                return i;
            }
        }
    }

    getTimesSurroundingTime(time: Date, numTimes) {
        let result = [];
        let half = Math.floor(numTimes / 2);
        for (let i = -half; i <= half; i++) {
            let cur = new Date();
            cur.setHours(cur.getHours() + i);
            result.push(cur);
        }
        return Observable.of(result);
    }

    getBuildingsAtTime(time) {
        return Observable.of(this._buildings);
    }

    getBuildings() {
        return Observable.of(this._buildings);
    }

    getRooms() {
        let result = [];
        this._buildings.forEach(function(building) {
            building.rooms.forEach(function(room) {
                room.building = building;
                result.push(room);
            });
        });
        return Observable.of(result);
    }

    addBuilding(name: string) {
        this._buildings.push(new Building(name, []))
        return Observable.of(this._buildings);
    }

    deleteBuilding(name: string) {
        this._buildings.splice(this.findBuildingIndex(name), 1);
        return Observable.of(this._buildings);
    }

    addRoom(buildingName: string, roomNumber: number) {
        this._buildings[this.findBuildingIndex(name)].rooms.push(roomNumber);
        return Observable.of(this._buildings[this.findBuildingIndex(name)]);
    }

    deleteRoom(buildingName: string, roomNumber: number) {
        let rooms = this._buildings[this.findBuildingIndex(name)].rooms;
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].number === roomNumber) {
                rooms.splice(i, 1);
                break;
            }
        }
        return Observable.of(rooms);
    }

    convertTimeToDateString(time: string): string {
        let format = 'hh:mm'
        return moment(time, format);
    }

    addTime(room, startTime: string, endTime: string, days) {
        room.times.push({
            start: new Date(this.convertTimeToDateString(startTime)),
            end: new Date(this.convertTimeToDateString(endTime)),
            days: days,
        });
    }

    deleteTime(room, startTime, endTime) {
        for (var i = 0; i < room.times.length; i++) {
            if (room.times[i].start === startTime && room.times[i].end === endTime) {
                room.time.splice(i, 1);
            }
        }
    }
}
