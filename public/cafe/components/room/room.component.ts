import {Component} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: "room",
    templateUrl: "cafe/components/room/room.view.html",
})
export class Room {
    constructor(
        private _router: Router
    ) {
    }
}
