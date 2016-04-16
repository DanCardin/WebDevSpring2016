import {OnInit, Component, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router} from 'angular2/router';

import {RoomService} from '../../../services/RoomService';


class Time {
    private dayOfWeekMap = {
        'M': 'label-primary', 'T': 'label-success', 'W': 'label-info', 'R': 'label-warning', 'F': 'label-danger'
    }

    daysOfTheWeek() {
        return Object.keys(this.dayOfWeekMap);
    }

    dayOfWeekSelected(days, day) {
        if (days.indexOf(day) !== -1) {
            return this.dayOfWeekMap[day];
        }
        return 'label-default';
    }

    dayOfWeekClass(day) {
        return this.dayOfWeekMap[day];
    }
}

@Component({
    selector: 'timecard',
    templateUrl: 'cafe/components/admin/buildings/timecard.view.html',
    styleUrls: ['cafe/components/admin/buildings/timecard.css'],
    directives: [NgClass],
})
export class TimeCard extends Time {
    @Input() public time;
    @Output() public deleted = new EventEmitter();

    constructor(private roomService: RoomService) {
        super();
    }

    deleteTime() {
        this.deleted.emit(this.time._id);
    }
}

@Component({
    selector: 'tr',
    templateUrl: 'cafe/components/admin/buildings/row.view.html',
    styleUrls: ['cafe/components/admin/buildings/timecard.css'],
    directives: [NgClass, TimeCard],
})
export class Row extends Time implements OnInit {
    @Input() public room;
    @Input() public buildings;
    @Output() public deleted = new EventEmitter();
    @Output() public edited = new EventEmitter();

    private times;
    public days = [];
    private previousSelection = null;

    public editBuildingMode = false;
    public editRoomMode = false;

    public buildingName;

    constructor(private roomService: RoomService) {
        super();
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['room']) {
            this.times = this.roomService.getTimesForRoom(this.room._id);
        }
    }

    ngOnInit() {
        this.buildingName = this.setBuildingName();
    }

    setBuildingName() {
        for (var i = 0; i < this.buildings.length; i++) {
            console.log('meow', this.buildings[i]._id, this.room.buildingId);
            if (this.buildings[i]._id === this.room.buildingId) {
                return this.buildings[i].name;
            }
        }
        return '';
    }

    enterEditBuildingMode(element) {
        this.editBuildingMode = true;
    }

    enterEditRoomMode(element) {
        this.editRoomMode = true;
        if (this.editRoomMode) {
            setTimeout(() => { element.focus(); }, 0);
        }
    }

    commitEdit(newBuilding, newRoom) {
        this.editBuildingMode = false;
        this.editRoomMode = false;
        this.edited.emit([this.room._id, newBuilding, newRoom]);
        this.buildingName = this.setBuildingName();
    }

    cancelEdit() {
        this.editBuildingMode = false;
        this.editRoomMode = false;
    }

    addTime(startTime: string, endTime: string) {
        if (!startTime || !endTime || this.days.length == 0) {
            return;
        }
        this.times = this.roomService.addTime(this.room._id, startTime, endTime, this.days);
    }

    selectDay(day) {
        let index = this.days.indexOf(day);
        if (index !== -1) {
            this.days.splice(index, 1);
        } else {
            this.days.push(day);
        }
    }

    deleteTime(timeId) {
        this.times = this.roomService.deleteTime(this.room._id, timeId);
    }

    deleteRoom(roomId) {
        this.deleted.emit(roomId);
    }
}

@Component({
    selector: 'thead',
    templateUrl: 'cafe/components/admin/buildings/thead.view.html',
})
export class THead {
    @Output() public added = new EventEmitter();

    constructor(private roomService: RoomService) {}

    addRoom() {
        this.added.emit(null);
    }
}

@Component({
    selector: 'profile',
    templateUrl: 'cafe/components/admin/buildings/buildings.view.html',
    directives: [THead, Row],
})
export class Buildings {
    public buildings;
    public rooms;
    constructor(private router: Router, private roomService: RoomService) {
        this.buildings = this.roomService.getBuildings();
        this.rooms = this.roomService.getRooms();
    }

    addRoom() {
        this.roomService.addRoom().subscribe();
        this.rooms = this.roomService.getRooms();
    }

    editRoom(update) {
        this.rooms = this.roomService.editRoom(update[0], update[1], update[2]);
    }

    deleteRoom(roomId) {
        this.roomService.deleteRoom(roomId).subscribe();
        this.rooms = this.roomService.getRooms();
    }

    addBuilding(buildingName) {
        this.roomService.addBuilding(buildingName.value).subscribe();
        this.buildings = this.roomService.getBuildings();
        buildingName.value = '';
    }

    deleteBuilding(buildingName) {
        this.roomService.deleteBuilding(buildingName.value).subscribe();
        this.buildings = this.roomService.getBuildings();
    }
}
