import FormModel = require('../models/form.model');

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
        var credentials = req.body;
        let result = FormModel.FormModel.findFormByTitle(credentials);
    }

    createForm(req, res) {
        console.log('createForm', req.params);
        let result = FormModel.FormModel.createForm(Number(req.params.userId), req.body);
        res.json(result);
    }

    getAllForms(req, res) {
        console.log('getAllForms', req.params.userId);
        let result = FormModel.FormModel.getAllForms(Number(req.params.userId));
        res.json(result);
    }

    findFormById(req, res) {
        console.log('findFormById');
        let result = FormModel.FormModel.findFormById(Number(req.params.formId));
        res.json(result);
    }

    updateForm(req, res) {
        console.log('updateForm', Number(req.params.formId));
        FormModel.FormModel.updateForm(Number(req.params.formId), req.body);
        res.json({});
    }

    deleteForm(req, res) {
        console.log('deleteForm');
        FormModel.FormModel.deleteForm(Number(req.params.formId));
        res.json({});
    }
}
