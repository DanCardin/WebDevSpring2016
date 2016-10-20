import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor(private http: Http) {}

    search(terms: Observable<string>, searchFunc, debounceDuration=400): Observable<Array<string>> {
        return terms
            .debounceTime(debounceDuration)
            .distinctUntilChanged()
            .switchMap((term: string) => searchFunc(this.http, term));
    }

    roomFunc(http, term: string): Observable<Array<string>> {
        return http.get('/api/cafe/search?roomSearch=' + term).map(res => res.json());
    }

    userFunc(http, term: string): Observable<Array<string>> {
        return http.get('/api/cafe/search?userSearch=' + term).map(res => res.json());
    }
}
