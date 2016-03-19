import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from 'rxjs/Observable';

import {Form, IForm, FormService} from "../../../services/FormService";
import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "forms-list",
    templateUrl: "assignment/views/forms/forms/forms.view.html",
})
export class FormsList {
    forms: Observable<Array<IForm>> = Observable.of([]);
    currentForm: IForm;

    constructor(
        private formService: FormService,
        private userService: UserService,
        private router: Router
    ) {
        this.currentForm = null;
        if (this.userService.currentUser) {
            console.log('im logged in')
            let currentUser = this.userService.currentUser._id;
            this.forms = this.formService.findAllFormsForUser(Number(currentUser));
        }
    }

    addForm(name) {
        let currentUser = this.userService.currentUser;
        let form: Form = new Form(name.value, currentUser._id);
        this.formService.createFormForUser(currentUser._id, form).subscribe();
        this.forms = this.formService.findAllFormsForUser(currentUser._id);

        name.value = "";
    }

    updateForm(name) {
        let currentUser = this.userService.currentUser;
        this.formService.updateFormById(
            this.currentForm._id,
            new Form(name.value, currentUser._id)
        ).subscribe();
        this.forms = this.formService.findAllFormsForUser(currentUser._id);

        this.currentForm = null;
        name.value = "";
    }

    deleteForm(form: IForm) {
        let currentUser = this.userService.currentUser;
        this.formService.deleteFormById(form._id).subscribe();
        this.forms = this.formService.findAllFormsForUser(currentUser._id);
    }

    selectForm(form: IForm, name) {
        this.currentForm = form;
        name.value = this.currentForm.name;
    }
}
