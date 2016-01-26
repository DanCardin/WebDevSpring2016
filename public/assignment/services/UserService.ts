import {Injectable} from "angular2/core";

export interface User {
    id: string;
    username: string;
    password: string;
}

@Injectable()
export class UserService {
    private _currentUsers: Array<User>;
    private _thisUser: User;

    constructor() {
        this._currentUsers = [];
    }

    setUser(user: User) {
        this._thisUser = user;
    }

    findUserByUsernameAndPassword(
        username: string, password: string, callback: (User) => void
    ) {
        if (callback) {
            this._currentUsers.forEach(user => {
                if (user.username === username && user.password === password) {
                    callback(user);
                    return;
                }
            });
            callback(null);
        }
    }

    findAllUsers(callback: () => void) {
        if (callback) {
            callback(this._currentUsers);
        }
    }

    createUser(user: User, callback: () => void) {
        // Adds a GUID: https://www.npmjs.com/package/guid
        this._currentUsers.append(user);
        if (callback) {
            callback(user);
        }
    }

    deleteUserById(guid: string, callback: () => void) {
        let index: int;
        this._currentUsers.forEach((user, i) => {
            if (user.id === guid) {
                index = i;
                return;
            }
        });
        this._currentUsers.splice(index, 1);
        if (callback) {
            callback(this._currentUsers);
        }
    }

    updateUser(guid: string, updatedUser: User, callback: () => void) {
        this._currentUsers.forEach(user => {
            if (user.id === guid) {
                for (let key in user) {
                    if (key === "id") {
                        continue;
                    }
                    user[key] = updatedUser[key];
                }
                if (callback) {
                    callback(user);
                }
                return;
            }
        });
        if (callback) {
            callback(null);
        }
    }
}
