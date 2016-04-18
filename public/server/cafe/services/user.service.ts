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
        this.app.post('/api/cafe/auth', this.auth);
        this.app.post('/api/cafe/login', this.login);
        this.app.post('/api/cafe/user', this.createUser);
        this.app.get('/api/cafe/user', this.findUserByCredentials);
        this.app.get('/api/cafe/user/:userId', this.findUserById);
        this.app.put('/api/cafe/user/:userId', this.updateUser);
        this.app.delete('/api/cafe/user/:userId', this.deleteUser);

        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey: 'secret',
            issuer: 'dcardin.webdev.com',
            audience: 'cafe.com',
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
        console.log('fuck this');
        let token = req.headers.authorization;
        if (!token) {
            return res.json({});
        }
        let decoded = jwt.verify(token.slice(4), 'secret')._doc;
        console.log('fuck this', decoded);
        return res.json(
            UserModel.findUserById(decoded._id)
            .then(
                (res) => {console.log('authed'); return {result: res};},
                (res) => {return {result: null, message: res};}
            )
        );
    }

    login(req, res) {
        console.log('woahhh', req.body)
        res.json(
            UserModel.findUserByCredentials(req.body)
            .then(
                (res) => {
                    return {
                        result: res,
                        jwt: jwt.sign(res, 'secret'),
                    };
                },
                (res) => {return {result: null, message: res};}
            )
        );
    }

    createUser(req, res) {
        console.log('createUser');
        let result = UserModel
            .createUser(req.body)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }

    findUserByCredentials(req, res) {
        if (req.query.hasOwnProperty('username') && req.query.hasOwnProperty('password')) {
            console.log('findUserByCredentials');
            let result = UserModel.findUserByCredentials(req.query)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
            res.json(result);
        } else {
            console.log('getAllUsers');
            let result = UserModel.getAllUsers()
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
            res.json(result);
        }
    }

    findUserById(req, res) {
        console.log('findUserById');
        let result = UserModel
            .findUserById(req.params.userId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }

    updateUser(req, res) {
        console.log('updateUser');
        let result = UserModel
            .updateUser(req.params.userId, req.body)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }

    deleteUser(req, res) {
        console.log('deleteUser');
        let result = UserModel
            .deleteUser(req.params.userId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }
}
