// <reference path="../typings/main.d.ts"/>

import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
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

export class Room {
    public number: string;
    public seats: string;
    public src = '';
    public times = [];
    constructor(_number: string, seats: string, times=null) {
        this.number = _number;
        this.seats = seats;
        if (times) {
            this.times = times;
        }
    }
}

@Injectable()
export class RoomService {
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
                room.building = building.name;
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

    updateRoom(room, newBuilding: string, newNumber: string) {
        if (newBuilding !== room.building) {
            let originalBuilding = this._buildings[this.findBuildingIndex(room.building)];
            for (var i = 0; i < originalBuilding.rooms.length; i++) {
                let currentRoom = originalBuilding.rooms[i];
                if (currentRoom.number == room.number) {
                    originalBuilding.rooms.splice(i, 1);
                    break;
                }
            }
            this._buildings[this.findBuildingIndex(newBuilding)].rooms.push(room);
            room.building = newBuilding;
        }
        room.number = newNumber;

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
