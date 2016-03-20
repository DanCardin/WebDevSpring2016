import {FieldService} from './services/field.service';
import {FormService} from './services/form.service';
import {UserService} from './services/user.service';

export class App {
    private fieldService: FieldService;
    private formService: FormService;
    private userService: UserService;

    constructor(private app) {
        this.fieldService = new FieldService(app);
        this.formService = new FormService(app);
        this.userService = new UserService(app);
    }
}
