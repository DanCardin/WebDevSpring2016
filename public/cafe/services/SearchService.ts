import {Injectable} from 'angular2/core';
import {URLSearchParams, Jsonp} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor(private jsonp: Jsonp) {}

    search(terms: Observable<string>, rooms: boolean=true, debounceDuration=400): Observable<Array<string>> {
        let searchFunc;
        if (rooms) {
            searchFunc = this.rawRoomSearch;
        } else {
            searchFunc = this.rawUserSearch;
        }

        return terms
            .debounceTime(debounceDuration)
            .distinctUntilChanged()
            .switchMap((term: string) => searchFunc(term));
    }

    rawRoomSearch(term: string): Observable<Array<string>> {
        let result = {
            'Shillman': ['Shillman', '101 Shillman', '201 Shillman'],
            '101 Snell': ['Snell'],
            '201 Snell': ['Snell'],
        }
        let starts = Object.keys(result);
        let results = [];
        for (var i = 0; i < starts.length; i++) {
            let key: string = starts[i];
            if (key.toLowerCase().startsWith(term.toLowerCase())) {
                results.push.apply(results, result[starts[i]]);
            }
        }
        for (var r = 0; r < results.length; r++) {
            results[r] = results[r].replace(/\s+/g, '');
        }
        return Observable.of(results);
    }

    rawUserSearch(term: string): Observable<Array<string>> {
        let result = {
            'alice': ['alice'],
            'bob': ['bob'],
            'dan': ['dan'],
            'snape': ['snape'],
        }
        let starts = Object.keys(result);
        let results = [];
        for (var i = 0; i < starts.length; i++) {
            let key: string = starts[i];
            if (key.toLowerCase().startsWith(term.toLowerCase())) {
                results.push.apply(results, result[starts[i]]);
            }
        }
        return Observable.of(results);
    }
}
