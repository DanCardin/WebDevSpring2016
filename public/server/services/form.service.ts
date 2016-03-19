export class FormService {
    constructor (private app, private model) {
        this.app.post('/api/assignment/form', this.findFormByTitle);
    }

    findFormByTitle(req, res) {
        var credentials = req.body;
        this.model.findFormByTitle(credentials);
        res.send(200);
    }
}
