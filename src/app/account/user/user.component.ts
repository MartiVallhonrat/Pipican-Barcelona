import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { FriendsServiceService } from 'src/app/friends/friend-service/friends-service.service';
import { AccountManagmentService } from '../account-managment.service';
import { UserFirebase } from '../account-interfaces/account.interface';

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
    private router: Router
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

  async addFriend() {
    await this.friendService.sendRequest(this.user.id)
    this.router.navigate(['/friends']);
  }
  async removeFriend() {
    await this.friendService.removeFriend(this.user.id);
    this.router.navigate(['/friends']);
  }
  
}
