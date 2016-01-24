export interface User {
    id: string;
    username: string;
    password: string;
}

export class UserService {
    private currentUsers: Array<User>;
    constructor() {
        this.currentUsers = [];
    }

    findUserByUsernameAndPassword(
        username: string, password: string, callback: (User) => void
    ) {
        if (callback) {
            this.currentUsers.forEach(user => {
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
            callback(this.currentUsers);
        }
    }

    createUser(user: User, callback: () => void) {
        // Adds a GUID: https://www.npmjs.com/package/guid
        this.currentUsers.append(user);
        if (callback) {
            callback(user);
        }
    }

    deleteUserById(guid: string, callback: () => void) {
        let index: int;
        this.currentUsers.forEach((user, i) => {
            if (user.id === guid) {
                index = i;
                return;
            }
        });
        this.currentUsers.splice(index, 1);
        if (callback) {
            callback(this.currentUsers);
        }
    }

    updateUser(guid: string, updatedUser: User, callback: () => void) {
        this.currentUsers.forEach(user => {
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
