import RoomModel = require('../models/room.model');

export class RoomService {
    constructor (private app) {
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

    getBuildings(req, res) {
        console.log('getBuildings', req.query.time);
        let result;
        if (req.query.time) {
            result = RoomModel.RoomModel.getBuildingsAtTime(new Date(req.query.time));
        } else {
            result = RoomModel.RoomModel.getBuildings();
        }
        // console.log('  Result: ', result);
        res.json(result);
    }

    getRooms(req, res) {
        console.log('getRooms');
        let result = RoomModel.RoomModel.getRooms();
        // console.log('  Result: ', result);
        res.json(result);
    }

    getTimesForRoom(req, res) {
        console.log('getTimesForRoom', req.params.roomId);
        let result = RoomModel.RoomModel.getTimesForRoom(Number(req.params.roomId));
        // console.log('  Result: ', result);
        res.json(result);
    }

    getSurroundingTimes(req, res) {
        console.log('getSurroundingTimes', req.query.time, req.query._number);
        let result = RoomModel.RoomModel.getSurroundingTimes(new Date(req.query.time), Number(req.query._number));
        // console.log('  Result: ', result);
        res.json(result);
    }

    addBuilding(req, res) {
        console.log('addBuilding', req.body.name);
        let result = RoomModel.RoomModel.addBuilding(req.body.name);
        // console.log('  Result: ', result);
        res.json(result);
    }

    deleteBuilding(req, res) {
        console.log('deleteBuilding', req.params.buildingId);
        let result = RoomModel.RoomModel.deleteBuilding(Number(req.params.buildingId));
        // console.log('  Result: ', result);
        res.json(result);
    }

    addRoom(req, res) {
        console.log('addRoom');
        let result = RoomModel.RoomModel.addRoom();
        // console.log('  Result: ', result);
        res.json(result);
    }

    deleteRoom(req, res) {
        console.log('deleteRoom');
        let result = RoomModel.RoomModel.deleteRoom(Number(req.params.roomId));
        // console.log('  Result: ', result);
        res.json(result);
    }

    editRoom(req, res) {
        console.log('editRoom', req.params.roomId, req.body);
        let result = RoomModel.RoomModel.editRoom(Number(req.params.roomId), req.body);
        // console.log('  Result: ', result);
        res.json(result);
    }

    addTime(req, res) {
        console.log('addRoom', req.params.roomId, req.body);
        let result = RoomModel.RoomModel.addTime(Number(req.params.roomId), req.body);
        // console.log('  Result: ', result);
        res.json(result);
    }

    deleteTime(req, res) {
        console.log('deleteRoom', req.params.roomId, req.params.timeId);
        let result = RoomModel.RoomModel.deleteTime(Number(req.params.roomId), Number(req.params.timeId));
        // console.log('  Result: ', result);
        res.json(result);
    }
}
