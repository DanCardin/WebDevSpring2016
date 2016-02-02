import {Injectable} from "angular2/core";

export interface IUser {
    _id: string;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export class User implements IUser {
    _id: string;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;

    constructor(
        name: string, password: string, email: string,
        firstName: string="", lastName: string="",
        id: string=null
    ) {
        if (id === null) {
            id = (new Date).getTime().toString();
        }
        this._id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = "admin";
    }

    get isAdmin(): boolean {
        return this.role === "admin";
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
        let users = [
            {_id: "123", firstName: "Alice",  lastName: "Wonderland",username: "alice",  password: "alice"},
            {_id: "234", firstName: "Bob",    lastName: "Hope",      username: "bob",    password: "bob"},
            {_id: "345", firstName: "Charlie",lastName: "Brown",     username: "charlie",password: "charlie"},
            {_id: "456", firstName: "Dan",    lastName: "Craig",     username: "dan",    password: "dan"},
            {_id: "567", firstName: "Edward", lastName: "Norton",    username: "ed",     password: "ed"}
        ]
        for (let user of users) {
            this._users.set(
                user._id,
                new User(user.username, user.password, "", user.firstName, user.lastName, user._id)
            );
        }
        this._currentUser = this._users.get("123");
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
            this._users.set(user._id, user);
            return resolve(user);
        });
    }

    deleteUserById(guid: string): Promise<Array<User>> {
        return new Promise<Array<User>>((resolve, reject) => {
            this._users.delete(guid);
            return resolve(Array.from(this._users.values()));
        });
    }

    updateUser(guid: string, user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            if (this._users.has(guid)) {
                this._users.set(user._id, user);
                return resolve(this._users.get(user._id));
            }
            return reject("User doesn't exist");
        });
    }
}
