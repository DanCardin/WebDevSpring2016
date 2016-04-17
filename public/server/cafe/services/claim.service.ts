import {ClaimModel} from '../models/claim.model';

export class ClaimService {
    constructor (private app) {
        this.app.get('/api/cafe/claim/:building', this.getClaimsForBuilding);
        this.app.get('/api/cafe/user/:userId/claim', this.getClaimsForUser);
        this.app.post('/api/cafe/user/:userId/claim', this.createClaimForUser);
        this.app.delete('/api/cafe/user/:userId/claim/:claimId', this.deleteClaim);
    }

    getClaimsForUser(req, res) {
        console.log('getClaimsForUser', req.params.userId);
        let result = ClaimModel
            .getClaimsForUser(req.params.userId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }

    createClaimForUser(req, res) {
        console.log('createClaimsForUser', req.params.userId, req.body);
        let result = ClaimModel
            .createClaimForUser(req.params.userId, req.body)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }

    deleteClaim(req, res) {
        console.log('deleteClaim', req.params.userId, req.params.claimId);
        let result = ClaimModel
            .deleteClaim(req.params.userId, req.params.claimId)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }

    getClaimsForBuilding(req, res) {
        console.log('getClaimsForBuilding', req.params.building);
        let result = ClaimModel
            .getClaimsForBuilding(req.params.building)
            .then(
                (res) => {return {result: res};},
                (res) => {return {result: null, message: res};}
            );
        res.json(result);
    }
}
