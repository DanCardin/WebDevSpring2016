import RoomModel = require('../models/room.model');

export class RoomService {
    constructor (private app) {
        this.app.post('/api/cafe/room', this.createRoom);
        this.app.get('/api/cafe/user', this.findUserByCredentials);
        this.app.get('/api/cafe/user/:userId', this.findUserById);
        this.app.put('/api/cafe/user/:userId', this.updateUser);
        this.app.delete('/api/cafe/user/:userId', this.deleteUser);
    }

    createUser(req, res) {
        console.log('createUser', req.body);
        let result = UserModel.UserModel.createUser(req.body);
        res.json(result);
    }

    findUserByCredentials(req, res) {
        console.log('findUserByCredentials');
        let result;
        console.log(' - ', req.query)
        if (req.query.hasOwnProperty('username') && req.query.hasOwnProperty('password')) {
            console.log(' - findUserByCredentials');
            result = UserModel.UserModel.findUserByCredentials(req.query);

        } else {
            result = UserModel.UserModel.getAllUsers();
            console.log(' - getAllUsers');
        }
        res.json(result);
    }

    findUserById(req, res) {
        console.log('findUserById');
        let result = UserModel.UserModel.findUserById(Number(req.params.userId));
        res.json(result);
    }

    updateUser(req, res) {
        console.log('updateUser', req.params.userId, req.body, "asdf");
        let result = UserModel.UserModel.updateUser(Number(req.params.userId), req.body);
        res.json(result);
    }

    deleteUser(req, res) {
        console.log('deleteUser');
        let result = UserModel.UserModel.deleteUser(Number(req.params.userId));
        res.json(result);
    }
}
