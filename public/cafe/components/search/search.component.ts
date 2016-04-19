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
  providers: [SearchService],
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
            {{ room.buildingName }}
           </li>
        </ul>

        {{ numUsers }} Results:
        <ul>
          <li *ngFor="#user of users | async" (click)="selectUser(user)">
            {{ user.username }}
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
        this.rooms = this.searchService.search(this.term.valueChanges, this.searchService.roomFunc);
        this.users = this.searchService.search(this.term.valueChanges, this.searchService.userFunc);
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

    selectBuilding(room) {
        this.router.navigate(['/Admin/Buildings']);
        setTimeout(() => {
            function scrollTo(element, to, duration) {
                let start = element.scrollTop,
                    change = to - start,
                    increment = 20;

                let animateScroll = function(elapsedTime) {
                    elapsedTime += increment;
                    var position = easeInOut(elapsedTime, start, change, duration);
                    element.scrollTop = position;
                    if (elapsedTime < duration) {
                        setTimeout(function() {
                            animateScroll(elapsedTime);
                        }, increment);
                    }
                };
                animateScroll(0);
            }

            function easeInOut(currentTime, start, change, duration) {
                currentTime /= duration / 2;
                if (currentTime < 1) {
                    return change / 2 * currentTime * currentTime + start;
                }
                currentTime -= 1;
                return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
            }

            function cumulativeOffset(element) {
                let top = 0;
                do {
                    top += element.offsetTop  || 0;
                    element = element.offsetParent;
                } while(element);
                return top;
            };

            console.log('ldfsadlkfja', room.buildingId)
            let row = document.querySelector('#room_' + room.number + room.buildingId);
            console.log('row', row)
            if (row) {
                scrollTo(document.body, cumulativeOffset(row) - 200, 1250);
                row.className = 'table-danger';
                setTimeout(() => row.className = '', 3000);
            }
        }, 500);
    }

    selectUser(user) {
        this.router.navigate(['/Admin/Users']);
        setTimeout(() => {
            let row = document.querySelector('#' + user.username);
            if (row) {
                row.className = 'table-danger';
                setTimeout(() => row.className = '', 3000);
            }
        }, 500);
    }
}
