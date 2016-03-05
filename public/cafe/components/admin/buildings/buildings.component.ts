import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {RoomService} from '../../../services/RoomService';

@Component({
    selector: 'profile',
    templateUrl: 'cafe/components/admin/buildings/buildings.view.html',
})
export class Buildings {
    public buildings;

    constructor(
        private _router: Router,
        private roomService: RoomService
    ) {
        this.roomService
            .getBuildings()
            .subscribe(result => this.buildings = result);
    }

    addBuilding(buildingName) {
        this.roomService.addBuilding(buildingName.value);
        buildingName.value = '';
    }

    addRoom(buildingSelect, roomNumber) {
        debugger
        this.roomService.addRoom(buildingSelect.value, roomNumber.value);
    }
}
