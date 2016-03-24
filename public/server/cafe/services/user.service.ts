import UserModel = require('../models/user.model');

export class UserService {
    constructor (private app) {
        this.app.post('/api/assignment/user', this.createUser);
        this.app.get('/api/assignment/user', this.findUserByCredentials);
        this.app.get('/api/assignment/user/:id', this.findUserById);
        this.app.put('/api/assignment/user/:id', this.updateUser);
        this.app.delete('/api/assignment/user/:id', this.deleteUser);
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
        let result = UserModel.UserModel.findUserById(Number(req.params.id));
        res.json(result);
    }

    updateUser(req, res) {
        console.log('updateUser', req.body, "asdf");
        let result = UserModel.UserModel.updateUser(Number(req.params.id), req.body);
        res.json(result);
    }

    deleteUser(req, res) {
        console.log('deleteUser');
        let result = UserModel.UserModel.deleteUser(Number(req.params.id));
        res.json(result);
    }
}
