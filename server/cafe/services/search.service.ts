import SearchModel = require('../models/search.model');

export class SearchService {
    constructor (private app) {
        this.app.get('/api/cafe/search', this.getSearch);
    }

    getSearch(req, res) {
        console.log('getSearch', req.query.search);
        let result = [];
        if (req.query.roomSearch) {
            result = SearchModel.SearchModel.getRoomSearch(req.query.roomSearch);
        }
        if (req.query.userSearch){
            result = SearchModel.SearchModel.getUserSearch(req.query.userSearch);
        }
        // console.log('  Result: ', result);
        res.json(result);
    }
}
