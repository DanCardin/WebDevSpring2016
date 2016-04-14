let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let jwt = require('jsonwebtoken');


import {UserModel} from '../models/user.model';

let auth = () => {
    return passport.authenticate('jwt', {session: false});
}

export class UserService {
    constructor (private app) {
        this.app.post('/api/auth', this.auth);
        this.app.post('/api/assignment/user', this.createUser);
        this.app.get('/api/assignment/user', this.findUserByCredentials);
        this.app.get('/api/assignment/user', auth, this.findUserByCredentials);
        this.app.get('/api/assignment/user/:userId', this.findUserById);
        this.app.put('/api/assignment/user/:userId', auth, this.updateUser);
        this.app.delete('/api/assignment/user/:userId', auth, this.deleteUser);
        this.app.post('/api/assignment/login', this.login);

        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey: 'secret',
            issuer: 'dcardin.webdev.com',
            audience: 'assignment.com',
        };
        passport.use(new JwtStrategy(
            opts,
            (jwt_payload, done) => {
                UserModel.findUserById(jwt_payload)
                .then((res) => {
                    done(null, res);
                })
            }));
    }

    auth(req, res) {
        let token = req.headers.authorization;
        if (!token) {
            return res.json({});
        }
        let decoded = jwt.verify(token.slice(4), 'secret')._doc;
        console.log('decoded', Object.keys(decoded));
        return res.json(
            UserModel.findUserById(decoded._id)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};})
        );
    }

    login(req, res) {
        console.log('woahhh', req.body)
        res.json(
            UserModel.findUserByCredentials(req.body)
            .then((res) => {
                return {
                    result: res,
                    jwt: jwt.sign(res, 'secret'),
                };
            })
            .catch((res) => {return {result: null, message: res};})
        );
    }

    createUser(req, res) {
        let result = UserModel
            .createUser(req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    findUserByCredentials(req, res) {
        res.json(
            UserModel.getAllUsers()
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};})
        );
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
        console.log('asdfsdfasdfasdfadsf')
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
