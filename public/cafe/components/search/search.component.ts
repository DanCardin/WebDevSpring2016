import {Component} from "angular2/core";
import {Control} from "angular2/common";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import {SearchService} from "../../services/SearchService";

@Component({
  selector: 'search',
  template: `
    <div role="search" class="dropdown form-group">
      <input
        [ngFormControl]="term"
        type="text"
        placeholder="Search"
        class="form-control dropdown-toggle"
        id="searchDropdown"
        data-toggle="dropdown"
      >
      <div
        class="dropdown-menu"
        aria-labelledby="searchDropdown"
        [hidden]="!hasResults(items | async)"
      >
        {{ numItems }} Results:
        <ul>
          <li *ngFor="#item of items | async">{{ item }}</li>
        </ul>
      </div>
    </div>
  `
})
export class Search {
    items: Observable<Array<string>>;
    term = new Control();
    numItems = 0;

    constructor(private searchService: SearchService) {
        this.items = searchService.search(this.term.valueChanges);
    }

    hasResults(results) {
        if (results) {
            this.numItems = results.length;
            return this.numItems > 0;
        }
        this.numItems = 0;
        return false;
    }
}
