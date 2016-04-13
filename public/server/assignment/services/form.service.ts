let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let jwt = require('jsonwebtoken');

import {FormModel} from '../models/form.model';
import {UserModel} from '../models/user.model';

let auth = () => {
    return passport.authenticate('jwt', {session: false});
}

export class FormService {
    constructor (private app) {
        this.app.get('/api/assignment/user/:userId/form', auth, this.getAllForms);
        this.app.get('/api/assignment/form/:formId', auth, this.findFormById);
        this.app.delete('/api/assignment/form/:formId', auth, this.deleteForm);
        this.app.post('/api/assignment/user/:userId/form', auth, this.createForm);
        this.app.put('/api/assignment/form/:formId', auth, this.updateForm);

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

    findFormByTitle(req, res) {
        console.log('findFormByTitle')
        let result = FormModel
            .findFormByTitle(req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    createForm(req, res) {
        console.log('createForm', req.params);
        let result = FormModel
            .createForm(req.params.userId, req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    getAllForms(req, res) {
        console.log('getAllForms', req.params.userId);
        let result = FormModel
            .getAllForms(req.params.userId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    findFormById(req, res) {
        console.log('findFormById');
        let result = FormModel
            .findFormById(req.params.formId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    updateForm(req, res) {
        console.log('updateForm', req.params.formId);
        let result = FormModel
            .updateForm(req.params.formId, req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    deleteForm(req, res) {
        console.log('deleteForm');
        let result = FormModel
            .deleteForm(req.params.formId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }
}
