// import {Guid} from "Guid";
import {Injectable} from "angular2/core";

export interface IUser {
    id: string;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export class User {
    id: string;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;

    constructor(
        name: string, password: string, email: string,
        firstName: string, lastName: string
    ) {
        this.id = null;
        this.name = name;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

@Injectable()
export class UserService {
    private _currentUsers: Array<User>;
    private _thisUser: User;

    constructor() {
        this._currentUsers = [];
        this._thisUser = new User("Dan", "dan", "email", "Dan", "Cardin");
    }

    setUser(user: User) {
        this._thisUser = user;
    }

    getUser() {
        return this._thisUser;
    }

    findUserByUsernameAndPassword(
        username: string, password: string, callback: (User) => void
    ) {
        if (callback) {
            this._currentUsers.forEach(user => {
                if (user.name === username && user.password === password) {
                    callback(user);
                    return;
                }
            });
            callback(null);
        }
    }

    findAllUsers(callback: (User) => void) {
        callback(this._currentUsers);
    }

    createUser(user: User, callback: (User) => void) {
        // user.id = Guid.raw();
        user.id = "asldkfjasdfjslkd";
        this._currentUsers.push(user);
        callback(user);
    }

    deleteUserById(guid: string, callback: (User) => void) {
        let index: number;
        this._currentUsers.forEach((user, i) => {
            if (user.id === guid) {
                index = i;
                return;
            }
        });
        this._currentUsers.splice(index, 1);
        callback(this._currentUsers);
    }

    updateUser(guid: string, updatedUser, callback: (User) => void) {
        this._currentUsers.forEach(user => {
            if (user.id === guid) {
                for (let key in user) {
                    if (key === "id") {
                        continue;
                    }
                    user[key] = updatedUser[key];
                }
                callback(user);
                return;
            }
        });
        callback(null);
    }
}
