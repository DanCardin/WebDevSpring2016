import {Component} from "angular2/core";
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
            this.claimService.getClaimsForUser(this.userService.currentUser._id).subscribe(res => this.claims = res);
            this.userService.findUserById(this.userService.currentUser._id).subscribe(res => this.user = res);
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

    deleteClaim(claim) {
        this.claimService.deleteClaimForUser(
            this.userService.currentUser._id,
            claim._id
        ).subscribe(res => this.claims = res);
    }
}
