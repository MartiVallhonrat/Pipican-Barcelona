import { Component, OnInit } from '@angular/core';
import { FriendsServiceService } from '../friend-service/friends-service.service';
import { UserFirebase } from 'src/app/account/account-interfaces/account.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbar2Component } from '../custom-snackbar2/custom-snackbar2.component';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit{
  friendList: UserFirebase[] = [];

  constructor(
    private friendService: FriendsServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.friendService.getFriendList();
    this.friendService.friendList?.subscribe(x => this.friendList = x)
  }

  async removeFriend(friendId: string) {
    await this.friendService.removeFriend(friendId);
    this.snackBar.openFromComponent(CustomSnackbar2Component, {duration: 2000, panelClass: "danger-snackbar"});
  }
}
