import {RoomService} from './services/room.service';
import {SearchService} from './services/search.service';
import {UserService} from './services/user.service';

export class Cafe {
    private roomService: RoomService;
    private searchService: SearchService;
    private userService: UserService;

    constructor(private app) {
        this.roomService = new RoomService(app);
        this.searchService = new SearchService(app);
        this.userService = new UserService(app);
    }
}
