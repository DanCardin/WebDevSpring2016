import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {RouterLink} from "angular2/router";
import {ACCORDION_DIRECTIVES, TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import {RoomService} from "../../services/RoomService";

@Component({
    selector: "home",
    templateUrl: "cafe/components/home/home.view.html",
    directives: [ACCORDION_DIRECTIVES, TAB_DIRECTIVES, RouterLink, ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    styles: [`
        .sebm-google-map-container {
            height: 300px;
        }
    `],
})
export class Home {
    public times;
    public buildings;
    public midway;
    public oneAtATime: boolean = true;

    public lat: number = 51.678418;
    public lng: number = 7.809007;

    constructor(private http: Http, private roomService: RoomService) {
        let numTimes = 5;
        this.times = [];
        this.midway = Math.floor(numTimes / 2);

        this.times = this.roomService.getSurroundingTimes(new Date(), numTimes);
        this.buildings = this.roomService.getBuildingsAtTime(new Date());
    }

    public status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false,
    };

    selectTime() {
    }

    moveTime() {
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
