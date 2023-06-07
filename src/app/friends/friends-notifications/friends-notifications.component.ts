import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FriendsServiceService } from '../friend-service/friends-service.service';
import { UserFirebase } from 'src/app/account/account-interfaces/account.interface';

@Component({
  selector: 'app-friends-notifications',
  templateUrl: './friends-notifications.component.html',
  styleUrls: ['./friends-notifications.component.scss']
})
export class FriendsNotificationsComponent implements OnInit {
  requestList: UserFirebase[] = [];

  constructor(
    private friendService: FriendsServiceService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.friendService.getRequestList();
    this.friendService.requestList?.subscribe(x => {
      this.requestList = x;
      this.changeDetectorRef.detectChanges();
    });
  }

  acceptRequest(friendId: string){
    this.friendService.acceptFriend(friendId);
  }
  rejectRequest(friendId: string){
    this.friendService.rejectFriend(friendId);
  }
}
