import mock = require('user.mock');

function findUserByUsername(username: string) {
    for (let i = 0; i < mock.users.length; i++) {
        let user = mock.users[i];
        if (user.username === username) {
            return user;
        }
    }
    return null;
}

function findUserByCredentials(credentials) {
    for (let i = 0; i < mock.users.length; i++) {
        let user = mock.users[i];
        if (user.username === credentials.username && user.password === credentials.password) {
            return user;
        }
    }
    return null;
}

function createUser(user) {
    mock.users.push(user);
    return mock.users;
}

function getAllUsers() {
    return mock.users;
}

function findUserById(id) {
    for (let i = 0; i < mock.users.length; i++) {
        let user = mock.users[i];
        if (user.id === id) {
            return user;
        }
    }
    return null;
}

function updateUser(id, newUser) {
    for (let i = 0; i < mock.users.length; i++) {
        let user = mock.users[i];
        if (user.id === id) {
            newUser.foreach(prop => user[prop] = prop);
            return;
        }
    }
}

function deleteUser(id) {
    for (let i = 0; i < mock.users.length; i++) {
        let user = mock.users[i];
        if (user.is === id) {
            mock.users.splice(i, 1);
            return;
        }
    }
}
