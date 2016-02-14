import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {Form, IForm, RoomService} from "../../../services/RoomService";
import {User, UserService} from "../../../services/UserService";

@Component({
    selector: "forms-list",
    templateUrl: "cafe/components/forms/forms/forms.view.html",
})
export class FormsList {
    forms: Array<IForm> = [];
    currentForm: IForm;

    constructor(
        private _formService: RoomService,
        private _userService: UserService,
        private router: Router
    ) {
        this.currentForm = null;
        Observable
            .fromPromise(
                this._formService.findAllFormsForUser(this._userService.currentUser._id)
            )
            .subscribe(forms => this.forms = forms);
    }

    addForm(name) {
        let user = this._userService.currentUser;
        let form: Form = new Form(name.value, user._id);
        this._formService
            .createFormForUser(form)
            .then(form => console.log(`Created the form ${name.value}.`))
            .catch(error => console.log(error));

        this._formService
            .findAllFormsForUser(user._id)
            .then((forms) => this.forms = forms);

        name.value = "";
    }

    updateForm(name) {
        let user = this._userService.currentUser;
        this._formService
            .updateFormById(
                this.currentForm._id,
                new Form(name.value, user._id)
            )
            .then((form) => console.log('updated the form'))
            .catch(error => console.log("Couldnt update the form"));

        this._formService
            .findAllFormsForUser(user._id)
            .then((forms) => this.forms = forms);

        this.currentForm = null;
        name.value = "";
    }

    deleteForm(form: IForm) {
        this._formService
            .deleteFormById(form._id)
            .then((forms) => this.forms = forms)
            .catch(error => console.log("Couldnt delete the form"));
    }

    selectForm(form: IForm, name) {
        this.currentForm = form;
        name.value = this.currentForm.name;
    }
}
