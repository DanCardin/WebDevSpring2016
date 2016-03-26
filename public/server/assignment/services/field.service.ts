import FieldModel = require('../models/fields.model');

export class FieldService {
    constructor (private app) {
        this.app.get('/api/assignment/form/:formId/field', this.getFieldsForForm);
        this.app.get('/api/assignment/form/:formId/:fieldId', this.getFieldForForm);
        this.app.delete('/api/assignment/form/:formId/field/:fieldId', this.deleteField);
        this.app.post('/api/assignment/form/:formId/field', this.createField);
        this.app.put('/api/assignment/form/:formId/field/:fieldId', this.updateField);
    }

    getFieldsForForm(req, res) {
        console.log('getFieldsForForm');
        let result = FieldModel.FieldModel.getFieldsForForm(Number(req.params.formId));
        res.json(result);
    }

    getFieldForForm(req, res) {
        console.log('getFieldForForm');
        let result = FieldModel.FieldModel.getFieldForForm(
            Number(req.params.formId),
            Number(req.params.fieldId));
        res.json(result);
    }

    deleteField(req, res) {
        console.log('deleteField');
        let result = FieldModel.FieldModel.deleteField(
            Number(req.params.formId),
            Number(req.params.fieldId));
        res.json(result);
    }

    createField(req, res) {
        console.log('createField');
        let result = FieldModel.FieldModel.createField(Number(req.params.formId), req.body);
        res.json(result);
    }

    updateField(req, res) {
        console.log('updateField');
        let result = FieldModel.FieldModel.updateField(
            Number(req.params.formId),
            Number(req.params.fieldId),
            req.body
        );
        res.json(result);
    }
}
