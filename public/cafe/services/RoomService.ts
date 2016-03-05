import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RoomService {
    constructor() {
    }

    private buildings: Array<any> = [
        {
            title: 'Shillman',
            rooms: [
                {number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
            ],
        },
        {
            title: 'Forsyth',
            rooms: [
                {number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
            ],
        },
        {
            title: 'Snell',
            rooms: [
                {number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
            ],
        },
        {
            title: 'Ryder',
            rooms: [
                {number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
                {number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png'},
            ],
        },
    ];

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
        return Observable.of(this.buildings);
    }
}
