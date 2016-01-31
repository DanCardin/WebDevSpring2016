// import {Guid} from "Guid";
import {Injectable} from "angular2/core";

export interface IUser {
    id: string;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export class User implements IUser {
    id: string;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;

    constructor(
        name: string, password: string, email: string,
        firstName: string = "", lastName: string = ""
    ) {
        this.id = "asdflaskdjfasldkfj";
        this.name = name;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = "Student";
    }
}

@Injectable()
export class UserService {
    private _users: Map<string, User>;
    private _currentUser: User;
    get currentUser(): User {
        return this._currentUser;
    }
    set currentUser(user: User) {
        this._currentUser = user;
    }

    constructor() {
        this._users = new Map<string, User>();
        let user = new User("Dan", "dan", "email", "Dan", "Cardin");
        this._currentUser = user;
        this._users.set(user.id, user);
    }

    findUserByUsernameAndPassword(username: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this._users.forEach(function(user) {
                if (user.name === username && user.password === password) {
                    return resolve(user);
                }
            });
            return reject("No user");
        });
    }

    findAllUsers(): Promise<Array<User>> {
        return new Promise<Array<User>>((resolve, reject) => {
            return resolve(Array.from(this._users.values()));
        });
    }

    createUser(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            // user.id = Guid.raw();
            user.id = "asldkfjasdfjslkd";
            this._users.set(user.id, user);
            return resolve(user);
        });
    }

    deleteUserById(guid: string): Promise<Array<User>> {
        return new Promise<Array<User>>((resolve, reject) => {
            this._users.delete(guid);
            return resolve(Array.from(this._users.values()));
        });
    }

    updateUser(guid: string, user: User): Promise<Array<User>> {
        return new Promise<Array<User>>((resolve, reject) => {
            if (this._users.has(guid)) {
                this._users.set(user.id, user);
                return resolve(this._users.get(user.id));
            }
            return reject("User doesn't exist");
        });
    }
}
