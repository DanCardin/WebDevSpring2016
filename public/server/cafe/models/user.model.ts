/// <reference path="../../../typings/main.d.ts"/>

import q = require('q');
import mongoose = require('mongoose');

import {User} from './user.schema';

export module UserModel {
    export function findUserById(userId: string) {
        return User.findById(userId).exec();
    }

    export function findUserByCredentials(credentials) {
        return User
            .findOne({username: credentials.username, password: credentials.password})
            .exec();
    }

    export function createUser(newUser) {
        let userObject = {
            username: newUser.username,
            password: newUser.password,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        };
        console.log('new user', userObject)
        return (new User(userObject)).save();
    }

    export function getAllUsers() {
        return User.find({}).exec();
    }

    export function updateUser(userId: string, newUser) {
        return User.findByIdAndUpdate(userId, newUser, {new: true}).exec();
    }

    export function deleteUser(userId: string) {
        return User.findByIdAndRemove(userId).exec();
    }
}
