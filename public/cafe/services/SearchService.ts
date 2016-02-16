import {Injectable} from 'angular2/core';
import {URLSearchParams, Jsonp} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor(private jsonp: Jsonp) {}

    search(terms: Observable<string>, debounceDuration=400) {
        return terms
            .debounceTime(debounceDuration)
            .distinctUntilChanged()
            .switchMap(term => this.rawSearch(term));
    }

    rawSearch (term: string): Observable<Array<string>> {
        var search = new URLSearchParams()
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');
        return this.jsonp
            .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
            .map((response) => response.json()[1]);
    }
}
