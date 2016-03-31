import {FieldModel} from '../models/fields.model';

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
        let result = FieldModel
            .getFieldsForForm(req.params.formId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    getFieldForForm(req, res) {
        console.log('getFieldForForm');
        let result = FieldModel
            .getFieldForForm(req.params.formId, req.params.fieldId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    deleteField(req, res) {
        console.log('deleteField');
        let result = FieldModel
            .deleteField(req.params.formId, req.params.fieldId)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    createField(req, res) {
        console.log('createField');
        let result = FieldModel
            .createField(req.params.formId, req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }

    updateField(req, res) {
        console.log('updateField');
        let result = FieldModel
            .updateField(req.params.formId, req.params.fieldId, req.body)
            .then((res) => {return {result: res};})
            .catch((res) => {return {result: null, message: res};});
        res.json(result);
    }
}
