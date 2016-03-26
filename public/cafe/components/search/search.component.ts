import {Component} from "angular2/core";
import {Router} from "angular2/router";
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
        [hidden]="!hasResults(rooms | async, true) && !hasResults(users | async, false)"
      >
        {{ numRooms }} Results:
        <ul>
          <li *ngFor="#room of rooms | async" (click)="selectBuilding(room)">
            {{ room }}
           </li>
        </ul>

        {{ numUsers }} Results:
        <ul>
          <li *ngFor="#user of users | async" (click)="selectUser(user)">
            {{ user }}
           </li>
        </ul>
      </div>
    </div>
  `
})
export class Search {
    rooms: Observable<Array<string>>;
    users: Observable<Array<string>>;
    term = new Control();
    numRooms = 0;
    numUsers = 0;

    constructor(private searchService: SearchService, private router: Router) {
        this.rooms = searchService.search(this.term.valueChanges, true);
        this.users = searchService.search(this.term.valueChanges, false);
    }

    hasResults(results, room: boolean) {
        if (room) {
            this.numRooms = results && results.length;
            return this.numRooms > 0;
        } else {
            this.numUsers = results && results.length;
            return this.numUsers > 0;
        }
    }

    selectBuilding(item: string) {
        this.router.navigate(['/Home']);
        if (!isNaN(+item.charAt(0))) {
            let i = 2;
            let str = item.substring(0, 1);
            while (!isNaN(+str)) {
                str = item.substring(0, i++);
            }
            i -= 2;
            $('#building_' + item.substring(i, item.length).replace(/\s+/g, '')).children().children().click();
            $('#building_' + item.replace(/\s+/g, '')).click();
        } else {
            $('#building_' + item.replace(/\s+/g, '')).children().children().click();
        }
    }

    selectUser(user) {
        this.router.navigate(['/Admin/Users']);
    }
}
