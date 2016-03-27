import ClaimModel = require('../models/claim.model');

export class ClaimService {
    constructor (private app) {
        this.app.get('/api/cafe/user/:userId/claim', this.getClaimsForUser);
        this.app.post('/api/cafe/user/:userId/claim', this.createClaimForUser);
        this.app.delete('/api/cafe/user/:userId/claim/:claimId', this.deleteClaim);
    }

    getClaimsForUser(req, res) {
        console.log('getClaimsForUser', req.params.userId);
        let result = ClaimModel.ClaimModel.getClaimsForUser(Number(req.params.userId));
        console.log('  Result: ', result);
        res.json(result);
    }

    createClaimForUser(req, res) {
        console.log('createClaimsForUser', req.params.userId, req.body);
        let result = ClaimModel.ClaimModel.createClaimForUser(Number(req.params.userId), req.body);
        // console.log('  Result: ', result);
        res.json(result);
    }

    deleteClaim(req, res) {
        console.log('deleteClaim', req.params.userId, req.params.claimId);
        let result = ClaimModel.ClaimModel.deleteClaim(Number(req.params.userId), Number(req.params.claimId));
        // console.log('  Result: ', result);
        res.json(result);
    }
}
