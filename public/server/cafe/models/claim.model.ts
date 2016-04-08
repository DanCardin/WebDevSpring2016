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
            // .populate('Building')
            // .populate('Room')
            // .populate('Time')
            .find({userId: userId})
            .exec();
    }

    export function createClaimForUser(userId: number, claim) {
        mock.claims.push({
            _id: (new Date()).getTime(),
            userId: userId,
            buildingId: claim.buildingId,
            roomId: claim.roomId,
            timeId: claim.timeId,
        });
        return getClaimsForUser(userId);
    }

    export function deleteClaim(userId: number, claimId: number) {
        for (var i = 0; i < mock.claims.length; i++) {
            if (mock.claims[i]._id) {
                mock.claims.splice(i, 1);
                break;
            }
        }
        return getClaimsForUser(userId);
    }
}
