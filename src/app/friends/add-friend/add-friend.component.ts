import { Component } from '@angular/core';
import { AccountManagmentService } from 'src/app/account/account-managment.service';
import { FriendsServiceService } from '../friend-service/friends-service.service';
import { User, UserFirebase } from 'src/app/account/account-interfaces/account.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent {

  searchedUsers?: UserFirebase[];
  userId = localStorage.getItem("id");
  form = new FormGroup({
    searcher: new FormControl("")
  });

  constructor(
    private accountService: AccountManagmentService,
    private friendService: FriendsServiceService,
    private snackBar: MatSnackBar
  ) { }

  onSearch() {
    if(this.form.value.searcher == (null || undefined) || this.form.value.searcher.length < 3) {
      return;
    };
    this.accountService.getUserByUsername(this.form.value.searcher, this.userId!)
      .then(users => this.searchedUsers = users);
  }

  async addRequest(friendId: string) {
    await this.friendService.sendRequest(friendId);
    this.snackBar.openFromComponent(CustomSnackbarComponent, {duration: 2000, panelClass: "success-snackbar"});
  }
}
