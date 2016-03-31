import RoomModel = require('./room.model');
import UserModel = require('./user.model');

export module ClaimModel {
    export function getClaimsForUser(userId: number) {
        let result = [];
        for (var claim of mock.claims) {
            let claimResult = {_id: claim._id};
            claimResult['day'] = 'today';
            if (userId === claim.userId) {
                for (var building of RoomModel.RoomModel.getData().buildings) {
                    if (building._id === claim.buildingId) {
                        for (var room of building.rooms) {
                            if (room._id === claim.roomId) {
                                claimResult['place'] = room.number + ' ' + building.name;
                                for (var time of room.times) {
                                    if (time._id === claim.timeId) {
                                        claimResult['start'] = time.start;
                                        claimResult['end'] = time.end;
                                    }
                                }
                            }
                        }
                    }
                }
                result.push(claimResult);
            }
        }
        return result;
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

    let mock = {
        claims: [
            {_id: 1, userId: 234, buildingId: 1, roomId: 4, timeId: 2},
            {_id: 2, userId: 234, buildingId: 1, roomId: 4, timeId: 3},
        ]
    }
}
