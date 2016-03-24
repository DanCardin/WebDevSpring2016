import {RoomService} from './services/room.service';
import {UserService} from './services/user.service';

export class Cafe {
    private roomService: RoomService;
    private userService: UserService;

    constructor(private app) {
        this.roomService = new RoomService(app);
        this.userService = new UserService(app);
    }
}
