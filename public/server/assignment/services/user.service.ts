import {UserModel} from '../models/user.model';

export class UserService {
    constructor (private app) {
        this.app.post('/api/assignment/user', this.createUser);
        this.app.get('/api/assignment/user', this.findUserByCredentials);
        this.app.get('/api/assignment/user/:userId', this.findUserById);
        this.app.put('/api/assignment/user/:userId', this.updateUser);
        this.app.delete('/api/assignment/user/:userId', this.deleteUser);
    }

    createUser(req, res) {
        let result = UserModel
            .createUser(req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    findUserByCredentials(req, res) {
        let result;
        if (req.query.hasOwnProperty('username') && req.query.hasOwnProperty('password')) {
            result = UserModel.findUserByCredentials(req.query)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        } else {
            result = UserModel.getAllUsers()
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        }
        res.json(result);
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
        let result = UserModel
            .updateUser(req.params.userId, req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    deleteUser(req, res) {
        console.log('deleteUser');
        let result = UserModel
            .deleteUser(req.params.userId);
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }
}
