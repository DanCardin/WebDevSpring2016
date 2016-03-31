import {FormModel} from '../models/form.model';

export class FormService {
    constructor (private app) {
        this.app.get('/api/assignment/user/:userId/form', this.getAllForms);
        this.app.get('/api/assignment/form/:formId', this.findFormById);
        this.app.delete('/api/assignment/form/:formId', this.deleteForm);
        this.app.post('/api/assignment/user/:userId/form', this.createForm);
        this.app.put('/api/assignment/form/:formId', this.updateForm);
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
