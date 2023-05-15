import { Component, OnInit } from '@angular/core';
import { FriendsServiceService } from '../friend-service/friends-service.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  userId = localStorage.getItem("id");

  constructor(
    private friendService: FriendsServiceService
  ) { }

  ngOnInit(): void {
      this.friendService.getFriendList();
  }

  

}
