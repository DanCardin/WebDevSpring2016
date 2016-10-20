import {Component, SimpleChange} from "angular2/core";
import {Router} from "angular2/router";

import {UserService} from "../../services/UserService";
import {ClaimService} from "../../services/ClaimService";

@Component({
    selector: "profile",
    templateUrl: "cafe/components/profile/profile.view.html",
    providers: [ClaimService],
})
export class Profile {
    private claims;
    private user;
    constructor(private router: Router, private userService: UserService, private claimService: ClaimService) {
        if (this.userService.currentUser) {
            this.getClaims();
            this.user = this.userService.currentUser;
        }
    }

    update(username: string, password: string, email: string) {
        let update = {username: username, password: password, email: email};
        this.userService
            .updateUser(this.userService.currentUser._id, update)
            .subscribe(res => {
                if (res) {
                    this.user = res;
                    this.router.navigate(["/Profile"]);
                }
            });
    }

    getClaims() {
        this.claimService.getClaimsForUser(this.userService.currentUser._id)
        .map(claims => {
            for (var claim of claims) {
                claim.time = new Date(claim.time);
            }
            return claims;
        })
        .subscribe(claims => {
            this.claims = claims;
        });
    }

    deleteClaim(claim) {
        this.claimService.deleteClaimForUser(this.userService.currentUser._id, claim.building)
        .subscribe(result => this.getClaims());
    }
}
