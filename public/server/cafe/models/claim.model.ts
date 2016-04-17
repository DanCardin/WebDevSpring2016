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
        return (new Building({
            userId: userId,
            building: claim.building,
            time: claim.timeslot,
        })).save();
    }

    export function deleteClaim(userId, claimId) {
        return Building.findByIdAndRemove(claimId).exec();
    }

    export function getClaimsForBuilding(building) {
        return Building.find({building: building}).count().exec();
    }
}
