import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User, UserService} from "../../services/UserService";
import {ClaimService} from "../../services/ClaimService";

@Component({
    selector: "profile",
    templateUrl: "cafe/components/profile/profile.view.html",
    providers: [ClaimService],
})
export class Profile {
    private claims;
    constructor(private router: Router, private userService: UserService, private claimService: ClaimService) {
        if (this.userService.currentUser) {
            this.claims = this.claimService.getClaimsForUser(this.userService.currentUser._id);
        }
    }

    update(username: string, password: string, email: string) {
        let update = new User(username, password, email);
        this.userService.updateUser(this.userService.currentUser._id, update).subscribe();
        this.router.navigate(["/Profile"]);
    }

    deleteClaim(claim) {
        this.claimService.deleteClaimForUser(this.userService.currentUser._id, claim._id).subscribe();
    }
}
