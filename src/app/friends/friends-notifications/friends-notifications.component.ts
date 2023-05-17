import { Component } from '@angular/core';
import { FriendsServiceService } from '../friend-service/friends-service.service';
import { UserFirebase } from 'src/app/account/account-interfaces/account.interface';

@Component({
  selector: 'app-friends-notifications',
  templateUrl: './friends-notifications.component.html',
  styleUrls: ['./friends-notifications.component.scss']
})
export class FriendsNotificationsComponent {
  requestList: UserFirebase[] = [];

  constructor(
    private friendService: FriendsServiceService
  ) {
    
  }

  ngOnInit(): void {
    this.friendService.getRequestList();
    this.friendService.requestList?.subscribe(x => {this.requestList = x; console.log(this.requestList)});
  }

  acceptRequest(friendId: string){
    this.friendService.acceptFriend(friendId);
  }
  rejectRequest(friendId: string){
    this.friendService.rejectFriend(friendId);
  }
}
