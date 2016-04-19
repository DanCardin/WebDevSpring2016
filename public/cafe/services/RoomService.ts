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

    getTimeFromString(time: string) {
        let format = 'MM/DD/YYYY hh:mm';
        return moment(`2/1/2016 ${time}`, format).valueOf();
    }

    getSurroundingTimes(time: Date, numTimes): Observable<Array<Date>> {
        return this.http
            .get('/api/cafe/room/time?time=' + time.getTime() + '&_number=' + numTimes)
            .map(res => res.json())
            .map(res => res.result)
            .map(res => {
                if (res) {
                    return res.map(d => new Date(d));
                }
                return [];
            });
    }

    getBuildingsAtTime(time) {
        return this.http
            .get('/api/cafe/building?time=' + time.getTime())
            .map(res => res.json())
            .map(res => res.result);
    }

    updateBuildingsFromApi() {
        return this.http
            .get('/api/cafe/buildings')
            .map(res => res.json())
            .map(res => res.result);
    }

    getBuildings() {
        return this.http
            .get('/api/cafe/building')
            .map(res => res.json())
            .map(res => res.result);
    }

    getRooms() {
        return this.http
            .get('/api/cafe/room')
            .map(res => res.json())
            .map(res => res.result);
    }

    getTimesForRoom(roomId) {
        return this.http
            .get('/api/cafe/room/' + roomId + '/time')
            .map(res => res.json())
            .map(res => res.result)
    }

    addBuilding(name: string) {
        console.log('add building')
        return this.http
            .post('/api/cafe/building', JSON.stringify({'name': name}), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }

    changeBuilding(building, update) {
        console.log('add building')
        return this.http
            .post('/api/cafe/building/' + building, JSON.stringify(update), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }

    deleteBuilding(buildingId) {
        return this.http
            .delete('/api/cafe/building/' + buildingId)
            .map(res => res.json())
            .map(res => res.result);
    }

    addRoom() {
        return this.http
            .post('/api/cafe/room', '{}', {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }

    editRoom(roomId, newBuilding: string, newNumber: string, latitude: string, longitude: string) {
        return this.http
            .put('/api/cafe/room/' + roomId,
                JSON.stringify(
                    {buildingId: newBuilding, number: newNumber, latitude: latitude, longitude: longitude}
                ),
                {headers: this.headers}
            )
            .map(res => res.json())
            .map(res => res.result);
    }

    deleteRoom(roomId: string) {
        console.log('deleteteeee', roomId)
        return this.http
            .delete('/api/cafe/room/' + roomId)
            .map(res => res.json())
            .map(res => res.result);
    }

    addTime(roomId, startTime: string, endTime: string, days) {
        return this.http
            .post('/api/cafe/room/' + roomId + '/time',
                JSON.stringify({
                    roomId: roomId,
                    'start': this.getTimeFromString(startTime),
                    'end': this.getTimeFromString(endTime),
                    'days': days}
                ),
                {headers: this.headers}
            )
            .map(res => res.json())
            .map(res => res.result);
    }

    deleteTime(roomId, timeId) {
        return this.http
            .delete('/api/cafe/room/' + roomId + '/time/' + timeId)
            .map(res => res.json())
            .map(res => res.result);
    }
}
