import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FriendsServiceService } from 'src/app/friends/friend-service/friends-service.service';
import { AccountManagmentService } from '../account-managment.service';
import { UserFirebase } from '../account-interfaces/account.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/friends/custom-snackbar/custom-snackbar.component';
import { CustomSnackbar2Component } from 'src/app/friends/custom-snackbar2/custom-snackbar2.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  isReady: boolean = false;
  user!: UserFirebase;
  isFriend!: boolean;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountManagmentService,
    private friendService: FriendsServiceService,
    private snackBar: MatSnackBar
    ) 
    { 
      this.accountService.getItemById(this.route.snapshot.params["id"])
      .subscribe(user => {
        this.user = user;
        this.isReady = true;
        this.friendService.isFriend(user.id)
          .then(result => {this.isFriend = result, console.log(result)});
      });
    }

  async addFriend(friendId: string) {
    await this.friendService.sendRequest(friendId)
    this.snackBar.openFromComponent(CustomSnackbarComponent, {duration: 2000, panelClass: "success-snackbar"});
  }
  async removeFriend(friendId: string) {
    await this.friendService.removeFriend(friendId);
    await this.snackBar.openFromComponent(CustomSnackbar2Component, {duration: 2000, panelClass: "danger-snackbar"});
    this.friendService.isFriend(this.user.id)
      .then(result => {this.isFriend = result});
  };
  
}
