import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';


@Injectable()
export class ClaimService {
    private headers;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getClaimsForUser(userId) {
        return this.http
            .get('/api/cafe/user/' + userId + '/claim')
            .map(res => res.json())
            .map(res => {
                for (var claim of res.result) {
                    claim.start = new Date(claim.start);
                    claim.end = new Date(claim.end);
                }
                return res.result;
            })
    }

    createClaimForUser(userId, claim) {
        return this.http
            .post('/api/cafe/user/' + userId + '/claim', JSON.stringify(claim), {headers: this.headers})
            .map(res => res.json())
            .map(res => res.result);
    }

    deleteClaimForUser(userId, claimId) {
        return this.http
            .delete('/api/cafe/user/' + userId + '/claim/' + claimId)
            .map(res => res.json())
            .map(res => res.result);
    }

    getClaimsForBuilding(building) {
        return this.http
            .get('/api/cafe/claim/' + building)
            .map(res => res.json())
            .map(res => res.result);
    }
}
