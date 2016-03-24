declare function require(name:string);

// var mock = require('./user.mock.json');
let mock = {users: [
    {"_id": 123, "firstName": "Alice",  "lastName": "Wonderland", "username": "alice",   "password": "alice"},
    {"_id": 234, "firstName": "Bob",    "lastName": "Hope",       "username": "bob",     "password": "bob"},
    {"_id": 345, "firstName": "Charlie","lastName": "Brown",      "username": "charlie", "password": "charlie"},
    {"_id": 456, "firstName": "Dan",    "lastName": "Craig",      "username": "dan",     "password": "dan"},
    {"_id": 567, "firstName": "Edward", "lastName": "Norton",     "username": "ed",      "password": "ed"},
]};

export module UserModel {
    export function findUserByUsername(username: string) {
        for (let i = 0; i < mock.users.length; i++) {
            let user = mock.users[i];
            if (user.username === username) {
                return user;
            }
        }
        return null;
    }

    export function findUserByCredentials(credentials) {
        for (let i = 0; i < mock.users.length; i++) {
            let user = mock.users[i];
            console.log('all', user)
            if (user.username === credentials.username && user.password === credentials.password) {
                return user;
            }
        }
        return null;
    }

    export function createUser(user) {
        mock.users.push(user);
        console.log('er', user);
        return user;
    }

    export function getAllUsers() {
        return mock.users;
    }

    export function findUserById(id) {
        for (var i = 0; i < mock.users.length; i++) {
            var user = mock.users[i];
            if (user._id === id) {
                return user;
            }
        }
        return [];
    }

    export function updateUser(id, newUser) {
        console.log('userl', newUser)
        for (var i = 0; i < mock.users.length; i++) {
            var user = mock.users[i];
            if (user._id === id) {
                console.log('update', user, id)
                for (var prop of newUser) {
                    if (user._id !== id) {
                        user[prop] = prop;
                    }
                }
                return mock.users;
            }
        }
        return [];
    }

    export function deleteUser(id) {
        for (var i = 0; i < mock.users.length; i++) {
            var user = mock.users[i];
            if (user._id === id) {
                mock.users.splice(i, 1);
                return [];
            }
        }
    }
}
