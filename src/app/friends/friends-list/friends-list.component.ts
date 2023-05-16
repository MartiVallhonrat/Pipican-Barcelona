import { Component, OnInit } from '@angular/core';
import { FriendsServiceService } from '../friend-service/friends-service.service';
import { UserFirebase } from 'src/app/account/account-interfaces/account.interface';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit{
  friendList: UserFirebase[] = [];

  constructor(
    private friendService: FriendsServiceService
  ) {
    this.friendService.friendList?.subscribe(x => {this.friendList = x; console.log(this.friendList)})
  }

  ngOnInit(): void {
    this.friendService.getFriendList();
  }

  removeFriend(friendId: string) {
    this.friendService.removeFriend(friendId);
  }
}
