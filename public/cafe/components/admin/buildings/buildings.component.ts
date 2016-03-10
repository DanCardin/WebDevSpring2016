import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router} from 'angular2/router';

import {RoomService} from '../../../services/RoomService';


@Component({
    selector: 'tr',
    template: `
      <td><a class="btn btn-danger">X</a></td>
      <td (dblclick)="enterEditBuildingMode(buildingSelect)">
        <span [hidden]="editBuildingMode">
          {{ room.building.name }}
        </span>
        <div [hidden]="!editBuildingMode">
          <select
            #buildingSelect
            (keyup.enter)="commitEdit(buildingSelect.value, roomSelect.value)"
            (keyup.escape)="cancelEdit()"
            (blur)="commitEdit(buildingSelect.value, roomSelect.value)"
          >
            <option *ngFor="#building of buildings | async">{{ building.name }}</option>
          </select>
        </div>
      </td>
      <td (dblclick)="enterEditRoomMode(roomSelect)">
        <span [hidden]="editRoomMode">
          {{ room.number }}
        </span>
        <div [hidden]="!editRoomMode">
          <input
            #roomSelect
            (keyup.enter)="commitEdit(buildingSelect.value, roomSelect.value)"
            (keyup.escape)="cancelEdit()"
            (blur)="commitEdit(buildingSelect.value, roomSelect.value)"
            [value]="room.number"
            class="full-width"
            type="text"
          >
        </div>
      </td>
      <td>
        <div class="navbar-xs">
          <ul class="nav navbar-nav">
            <li class="nav-item" *ngFor="#time of room?.times">
              <div class="card text-xs-center card-size">
                <div class="card-header card-block-ov">
                  <span class="label label-pill" [ngClass]="dayOfWeekClass(day)" *ngFor="#day of time.days">
                    {{ day }}
                  </span>
                </div>
                <div class="card-block card-block-ov">
                  <span class="label label-primary">{{ time.start | date: "h:mm" }}</span>
                  <span class="label label-info">{{ time.end | date: "h:mm" }}</span>
                </div>
                <div class="card-footer card-danger card-footer-ov">
                  <a class="label label-danger" (click)="deleteTime(time.start, time.end)">Remove</a>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <div class="card text-xs-center card-size">
                <div class="card-block card-block-ov">
                  <input #startTime type="time" class="full-width half-height" placeholder="Start Time">
                  <input #endTime type="time" class="full-width half-height" placeholder="End Time">
                </div>
                <div class="card-footer card-success card-footer-ov">
                  <a class="label label-success" (click)="addTime(startTime.value, endTime.value)">
                    Add
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </td>
    `,
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

    dayOfWeekClass(day) {
        return this.dayOfWeekMap[day];
    }

    commitEdit(buildingSelect, roomSelect) {
        this.editBuildingMode = false;
        this.editRoomMode = false;
        this.room.building = buildingSelect;
        this.room.number = roomSelect;
    }

    cancelEdit() {
        this.editBuildingMode = false;
        this.editRoomMode = false;
    }

    addTime(startTime: string, endTime: string) {
        if (!startTime || !endTime) {
            return;
        }
        this.roomService.addTime(this.room, startTime, endTime, []);
    }

    deleteTime(start, end) {
        this.roomService.deleteTime(this.room, start, end);
    }
}

@Component({
    selector: 'thead',
    template: `
        <th></th>
        <th><a>
          <span class="fa fa-chevron-down" aria-hidden="true"></span>
          Building
        </a></th>
        <th><a>
          <span class="fa fa-chevron-down" aria-hidden="true"></span>
          Room
        </a></th>
        <th><a>
          <span class="fa fa-chevron-down" aria-hidden="true"></span>
          Times
        </a></th>`,
})
export class THead {}

@Component({
    selector: 'profile',
    template: `
        <div class="container">
          <div class="row">
            <div class="col-xs-6">
              <input
                #buildingName
                (keyup.enter)="addBuilding(buildingName)"
                type="text"
                placeholder="Building">
              <a class="btn btn-primary" (click)="addBuilding(buildingName)">Add</a>
            </div>
            <div class="col-xs-6">
              <select #buildingSelect placeholder="Building">
                <option *ngFor="#building of buildings | async">{{ building.name }}</option>
              </select>
              <a class="btn btn-danger" (click)="deleteBuilding(buildingSelect)">Delete</a>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
            <thead></thead>
            <tr *ngFor="#room of rooms | async" [room]="room" [buildings]="buildings"></tr>
          </table>
        </div>
    `,
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
