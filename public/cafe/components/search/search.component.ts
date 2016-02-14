// import {Control} from "angular2";
import {Component} from "angular2/core";

import {SearchService} from "../../services/SearchService";

@Component({
  selector: 'search',
  template: `
    <div role="search" class="dropdown form-group">
      <input [ngFormControl]="term" type="text" placeholder="Search" class="form-control">
      <div>
        <ul>
          <li *ngFor="#item of items"></li>
        </ul>
      </div>
    </div>
  `
})
export class Search {
    items: Array<string>;
    // term = new Control();
    constructor(private searchService: SearchService) {
        this.term.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => this.searchService.search(term))
            .subscribe(items => this.items = items);
    }
}
