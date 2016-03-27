import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';


@Injectable()
export class ClaimService {
    private headers;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getClaimsForUser(userId: number) {
        return this.http
            .get('/api/cafe/user/' + userId + '/claim')
            .map(res => res.json())
            .map(res => {
                for (var claim of res) {
                    claim.start = new Date(claim.start);
                    claim.end = new Date(claim.end);
                }
                return res;
            });
    }

    createClaimForUser(userId: number, claim) {
        return this.http
            .post('/api/cafe/user/' + userId + '/claim', JSON.stringify(claim), {headers: this.headers})
            .map(res => res.json());
    }

    deleteClaimForUser(userId: number, claimId: number) {
        return this.http
            .delete('/api/cafe/user/' + userId + '/claim/' + claimId)
            .map(res => res.json());
    }
}
