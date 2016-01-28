import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";

import {Form, IForm, FormService} from "../../services/FormService";
import {User, UserService} from "../../services/UserService";

@Component({
    selector: "forms-list",
    templateUrl: "app/forms/form-list/form-list.view.html",
})
export class FormsList {
    forms: Array<IForm> = [];

    constructor(
        private _formService: FormService,
        private _userService: UserService,
        private router: Router
    ) {
        let callback: (IForm) => void = (forms) => {
            this.forms = forms;
        };
        this._formService.findAllFormsForUser(
            this._userService.getUser().id,
            callback
        );
    }

    addForm(name) {
        let user = this._userService.getUser();
        let form: Form = new Form(name.value);
        let callback: (IForm) => void = (form) => {
            console.log(`Created the form ${name.value}.`);
        };
        this._formService.createFormForUser(
            user.id,
            form,
            callback
        );
        let callback2: (IForm) => void = (forms) => {
            this.forms = forms;
        };
        this._formService.findAllFormsForUser(
            user.id,
            callback2
        );
        name.value = "";
    }

    updateForm() {
    }

    deleteForm(form: IForm) {
        let callback: (Iform) => void = (forms) => {
            this.forms = forms;
        };
        this._formService.deleteFormById(form.id, callback);
    }

    selectForm(form: IForm) {
    }
}
