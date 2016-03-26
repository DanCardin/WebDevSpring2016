import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
declare var moment: any;

@Injectable()
export class RoomService {
    private headers;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    convertTimeToDateString(time: string): string {
        let format = 'hh:mm'
        return moment(time, format);
    }

    getSurroundingTimes(time: Date, numTimes): Observable<Array<Date>> {
        return this.http
            .get('/api/cafe/room/time?time=' + time.getTime() + '&_number=' + numTimes)
            .map(res => res.json())
            .map(res => res.map(d => new Date(d)));
    }

    getBuildingsAtTime(time) {
        return this.http
            .get('/api/cafe/building?time=' + time.getTime())
            .map(res => res.json());
    }

    getBuildings() {
        return this.http
            .get('/api/cafe/building')
            .map(res => res.json());
    }

    getRooms() {
        return this.http
            .get('/api/cafe/room')
            .map(res => res.json());
    }

    getTimesForRoom(roomId) {
        return this.http
            .get('/api/cafe/room/' + roomId + '/time')
            .map(res => res.json());
    }

    addBuilding(name: string) {
        return this.http
            .post('/api/cafe/building', JSON.stringify({'name': name}), {headers: this.headers})
            .map(res => res.json());
    }

    deleteBuilding(buildingId) {
        return this.http
            .delete('/api/cafe/building/' + buildingId)
            .map(res => res.json());
    }

    addRoom() {
        return this.http
            .post('/api/cafe/room', '{}', {headers: this.headers})
            .map(res => res.json());
    }

    editRoom(roomId, newBuilding: string, newNumber: string) {
        return this.http
            .put('/api/cafe/room/' + roomId,
                 JSON.stringify({'building': newBuilding, 'number': newNumber}),
                 {headers: this.headers}
            )
            .map(res => res.json());
    }

    deleteRoom(roomId: string) {
        console.log('deleteteeee', roomId)
        return this.http
            .delete('/api/cafe/room/' + roomId)
            .map(res => res.json());
    }

    addTime(roomId, startTime: string, endTime: string, days) {
        return this.http
            .post('/api/cafe/building',
                JSON.stringify({'startTime': startTime, 'endTime': endTime, 'days': days}),
                {headers: this.headers}
            )
            .map(res => res.json());
    }

    deleteTime(roomId, timeId) {
        return this.http
            .delete('/api/cafe/room/' + roomId + '/time/' + timeId)
            .map(res => res.json());
    }
}
