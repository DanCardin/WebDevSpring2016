import mock = require('form.mock');

function findFormByTitle(title) {
    for (let i = 0; i < mock.forms.length; i++) {
        let form = mock.forms[i];
        if (form.title === title) {
            return user;
        }
    }
    return null;
}

function createform(form) {
    mock.forms.push(form);
    return mock.forms;
}

function getAllForms() {
    return mock.forms;
}

function findFormById(id) {
    for (let i = 0; i < mock.forms.length; i++) {
        let form = mock.forms[i];
        if (form.id === id) {
            return form;
        }
    }
    return null;
}

function updateForm(id, newForm) {
    for (let i = 0; i < mock.forms.length; i++) {
        let form = mock.forms[i];
        if (form.id === id) {
            newForm.foreach(prop => form[prop] = prop);
            return;
        }
    }
}

function deleteForm(id) {
    for (let i = 0; i < mock.forms.length; i++) {
        let form = mock.forms[i];
        if (form.id === id) {
            mock.forms.splice(i, 1);
            return;
        }
    }
}
