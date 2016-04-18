import {RoomModel} from '../models/room.model';

export class RoomService {
    constructor (private app) {
        this.app.get('/api/cafe/buildings', this.queryApi);
        this.app.get('/api/cafe/building', this.getBuildings);
        this.app.post('/api/cafe/building', this.addBuilding);
        this.app.delete('/api/cafe/building/:buildingId', this.deleteBuilding);

        this.app.get('/api/cafe/room', this.getRooms);
        this.app.post('/api/cafe/room', this.addRoom);
        this.app.put('/api/cafe/room/:roomId', this.editRoom);
        this.app.delete('/api/cafe/room/:roomId', this.deleteRoom);

        this.app.get('/api/cafe/room/:roomId/time', this.getTimesForRoom);
        this.app.get('/api/cafe/room/time', this.getSurroundingTimes);
        this.app.post('/api/cafe/room/:roomId/time', this.addTime);
        this.app.delete('/api/cafe/room/:roomId/time/:timeId', this.deleteTime);
    }

    queryApi(req, res) {
        console.log('query api');
        // res.json(RoomModel.fillRoomsFromApi().toString());
        res.json(RoomModel.fillRoomsFromApi().done());
    }

    getBuildings(req, res) {
        console.log('getBuildings', req.query.time);
        res.json(
            RoomModel.getBuildingsAtTime(req.query.time)
            .then(
                (res) => {console.log('wwwww', res); return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    getRooms(req, res) {
        console.log('getRooms');
        res.json(
            RoomModel.getRooms()
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    getTimesForRoom(req, res) {
        // console.log('getTimesForRoom', req.params.roomId);
        res.json(
            RoomModel.getTimesForRoom(req.params.roomId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    getSurroundingTimes(req, res) {
        console.log('getSurroundingTimes', req.query.time, req.query._number);
        res.json(RoomModel
            .getSurroundingTimes(Number(req.query.time), Number(req.query._number))
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    addBuilding(req, res) {
        console.log('addBuilding', req.body.name);
        res.json(
            RoomModel.addBuilding(req.body.name)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    deleteBuilding(req, res) {
        console.log('deleteBuilding', req.params.buildingId);
        res.json(
            RoomModel.deleteBuilding(req.params.buildingId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    addRoom(req, res) {
        console.log('addRoom');
        res.json(
            RoomModel.addRoom()
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    deleteRoom(req, res) {
        console.log('deleteRoom');
        res.json(
            RoomModel.deleteRoom(req.params.roomId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    editRoom(req, res) {
        console.log('editRoom', req.params.roomId, req.body);
        res.json(
            RoomModel.editRoom(req.params.roomId, req.body)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    addTime(req, res) {
        console.log('addRoom', req.params.roomId, req.body);
        res.json(
            RoomModel.addTime(req.body)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    deleteTime(req, res) {
        console.log('deleteRoom', req.params.roomId, req.params.timeId);
        res.json(
            RoomModel.deleteTime(req.params.roomId, req.params.timeId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }
}
