/// <reference path="../../../typings/main.d.ts"/>

import q = require('q');
import mongoose = require('mongoose');

import {RoomModel} from './room.model';
import {UserModel} from './user.model';

import {User} from './user.schema';
import {Claim} from './claim.schema';
import {Building, Room, Time} from './room.schema';

export module ClaimModel {
    export function getClaimsForUser(userId) {
        return Claim
            .find({userId: userId})
            .exec();
    }

    export function createClaimForUser(userId, claim) {
        return Claim.find({userId: userId, building: claim.building}, (err, docs) => {
            if (!docs.length) {
                console.log('createing a claim', {
                    userId: userId,
                    building: claim.building,
                    time: claim.timeslot,
                });
                return (new Claim({
                    userId: userId,
                    building: claim.building,
                    time: claim.timeslot,
                })).save();
            }
        }).exec()
    }

    export function deleteClaim(userId, claim) {
        return Claim.remove({userId: userId, building: claim}).exec();
    }

    export function getClaimsForBuilding(building) {
        return Claim.find({building: building}).count().exec();
    }
}
