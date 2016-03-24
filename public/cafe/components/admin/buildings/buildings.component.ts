import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router} from 'angular2/router';

import {RoomService} from '../../../services/RoomService';


@Component({
    selector: 'tr',
    templateUrl: 'cafe/components/admin/buildings/row.view.html',
    directives: [NgClass],
})
export class Row {
    @Input()
    public room;

    @Input()
    public buildings;

    private previousSelection = null;

    public editBuildingMode = false;
    public editRoomMode = false;
    private dayOfWeekMap = {
        'M': 'label-primary', 'T': 'label-success', 'W': 'label-info', 'R': 'label-warning', 'F': 'label-danger'
    }
    public days = [];

    constructor(private roomService: RoomService) {}

    enterEditBuildingMode(element) {
        this.editBuildingMode = true;
    }

    enterEditRoomMode(element) {
        this.editRoomMode = true;
        if (this.editRoomMode) {
            setTimeout(() => { element.focus(); }, 0);
        }
    }

    daysOfTheWeek() {
        return Object.keys(this.dayOfWeekMap);
    }

    dayOfWeekSelected(day) {
        if (this.days.indexOf(day) !== -1) {
            return this.dayOfWeekMap[day];
        }
        return 'label-default';
    }

    selectDay(day) {
        let index = this.days.indexOf(day);
        if (index !== -1) {
            this.days.splice(index, 1);
        } else {
            this.days.push(day);
        }
    }

    dayOfWeekClass(day) {
        return this.dayOfWeekMap[day];
    }

    commitEdit(newBuilding, newRoom) {
        this.editBuildingMode = false;
        this.editRoomMode = false;
        this.roomService.updateRoom(this.room, newBuilding, newRoom);
    }

    cancelEdit() {
        this.editBuildingMode = false;
        this.editRoomMode = false;
    }

    addTime(startTime: string, endTime: string) {
        if (!startTime || !endTime || this.days.length == 0) {
            return;
        }
        this.roomService.addTime(this.room, startTime, endTime, this.days);
    }

    deleteTime(start, end) {
        this.roomService.deleteTime(this.room, start, end);
    }
}

@Component({
    selector: 'thead',
    templateUrl: 'cafe/components/admin/buildings/thead.view.html',
})
export class THead {}

@Component({
    selector: 'profile',
    templateUrl: 'cafe/components/admin/buildings/buildings.view.html',
    directives: [THead, Row],
})
export class Buildings {
    public buildings;
    public rooms;
    constructor(
        private _router: Router,
        private roomService: RoomService
    ) {
        this.buildings = this.roomService.getBuildings();
        this.rooms = this.roomService.getRooms();
    }

    addBuilding(buildingName) {
        this.roomService.addBuilding(buildingName.value);
        buildingName.value = '';
    }

    deleteBuilding(buildingName) {
        this.roomService.deleteBuilding(buildingName.value);
    }
}
