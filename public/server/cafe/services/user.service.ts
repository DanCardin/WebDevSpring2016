import {UserModel} from '../models/user.model';

export class UserService {
    constructor (private app) {
        this.app.post('/api/cafe/user', this.createUser);
        this.app.get('/api/cafe/user', this.findUserByCredentials);
        this.app.get('/api/cafe/user/:userId', this.findUserById);
        this.app.put('/api/cafe/user/:userId', this.updateUser);
        this.app.delete('/api/cafe/user/:userId', this.deleteUser);
    }
    createUser(req, res) {
        console.log('createUser');
        let result = UserModel
            .createUser(req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    findUserByCredentials(req, res) {
        if (req.query.hasOwnProperty('username') && req.query.hasOwnProperty('password')) {
            console.log('findUserByCredentials');
            let result = UserModel.findUserByCredentials(req.query)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
            res.json(result);
        } else {
            console.log('getAllUsers');
            let result = UserModel.getAllUsers()
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
            res.json(result);
        }
    }

    findUserById(req, res) {
        console.log('findUserById');
        let result = UserModel
            .findUserById(req.params.userId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    updateUser(req, res) {
        console.log('updateUser');
        let result = UserModel
            .updateUser(req.params.userId, req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    deleteUser(req, res) {
        console.log('deleteUser');
        let result = UserModel
            .deleteUser(req.params.userId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }
}
