import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from 'rxjs/Observable';

import {FormService} from "../../../services/FormService";
import {UserService} from "../../../services/UserService";

@Component({
    selector: "forms-list",
    templateUrl: "assignment/views/forms/forms/forms.view.html",
})
export class FormsList {
    private forms;

    constructor(private formService: FormService, private userService: UserService, private router: Router) {
        if (this.userService.currentUser) {
            let currentUser = this.userService.currentUser._id;
            this.forms = this.formService.findAllFormsForUser(currentUser);
        }
    }

    addForm(title) {
        let userId = this.userService.currentUser._id;
        let form = {title: title.value, userId: userId};
        this.formService.createFormForUser(userId, form).subscribe();
        this.forms = this.formService.findAllFormsForUser(userId);

        title.value = "";
    }

    updateForm(title) {
        let userId = this.userService.currentUser._id;
        this.formService.updateFormById(
            this.formService.currentForm._id, {title: title.value, userId: userId}
        ).subscribe();
        this.forms = this.formService.findAllFormsForUser(userId);

        this.formService.currentForm = null;
        title.value = "";
    }

    deleteForm(form) {
        let userId = this.userService.currentUser._id;
        this.formService.deleteFormById(form._id).subscribe();
        this.forms = this.formService.findAllFormsForUser(userId);
    }

    selectForm(form, title, go=false) {
        this.formService.currentForm = form;
        if (!go) {
            title.value = this.formService.currentForm.title;
        } else {
            this.router.navigate(['/Forms/FieldsList'])
        }
    }
}
