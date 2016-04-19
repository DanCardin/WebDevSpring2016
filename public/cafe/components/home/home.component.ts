import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Http} from 'angular2/http';
import {RouterLink} from "angular2/router";
import {ACCORDION_DIRECTIVES, TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import {RoomService} from "../../services/RoomService";
import {ClaimService} from "../../services/ClaimService";
import {UserService} from "../../services/UserService";

@Component({
    selector: "home",
    templateUrl: "cafe/components/home/home.view.html",
    directives: [NgClass, ACCORDION_DIRECTIVES, TAB_DIRECTIVES, RouterLink, ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    providers: [ClaimService],
    styles: [`
        .sebm-google-map-container {
            height: 300px;
        }
    `],
})
export class Home implements OnInit{
    public times;
    public buildings;
    public midway;
    public oneAtATime: boolean = true;
    public currentTime;

    public zoom: number = 18;

    constructor(
        private http: Http,
        private roomService: RoomService,
        private userService: UserService,
        private claimService: ClaimService
    ) {}

    ngOnInit() {
        let numTimes = 5;
        this.times = [];
        this.midway = Math.floor(numTimes / 2);

        let time = new Date();
        let curTime = new Date(2016, 1, 1, time.getHours(), time.getMinutes());
        this.roomService.getSurroundingTimes(curTime, numTimes)
        .subscribe(times => {
            if (times.length) {
                this.times = times;
                this.currentTime = times[1];
                this.roomService.getBuildingsAtTime(this.currentTime)
                .subscribe(buildings => {
                    this.buildings = buildings;
                    for (var building of buildings) {
                        for (var room of building.rooms) {
                            this.claimService.getClaimsForBuilding(room.number + building.name).subscribe(claims => {
                                room.new_seats = room.seats - claims;
                                room.claimed = claims;
                                console.log('room.claimed', room.claimed, room.new_seats)
                            });
                        }
                    }
                });
            }
        });
    }

    public status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false,
    };

    activeTime(index) {
        if (index === 1) {
            return 'btn-primary';
        }
        return '';
    }

    unclaimRoom(building, room) {
        this.claimService.deleteClaimForUser(this.userService.currentUser._id, room.number + building.name)
        .subscribe(result => {
            this.claimService.getClaimsForBuilding(room.number + building.name).subscribe(claims => {
                room.new_seats = room.seats - claims;
                room.claimed = claims;
            });
        });
    }

    claimRoom(building, room) {
        this.claimService.createClaimForUser(this.userService.currentUser._id, {
            building: room.number + building.name,
            timeslot: this.currentTime.toString(),
        }).subscribe(result => {
            this.claimService.getClaimsForBuilding(room.number + building.name).subscribe(claims => {
                room.new_seats = room.seats - claims;
                room.claimed = claims;
            });
        });
    }

    private getCoords() {
        let address = encodeURIComponent('Shillman Hall, Boston, MA');
        console.log(address);

        return this.http
            .get('http:h/maps.google.com/maps/api/geocode/json?address=' + address + ',+CA&sensor=false')
            .map((response) => {
                console.log('map', response);
                return response.json()[1];
            });
    }
}
