// import {UserModel} from './models/user.model';
import {UserService} from './services/user.service';

import {FormModel} from './models/form.model';
import {FormService} from './services/form.service';

export class App {
    private userService: UserService;
    private formService: FormService;

    constructor(private app) {
        this.userService = new UserService(app);
        this.formService = new FormService(app, new FormModel());
    }
}
