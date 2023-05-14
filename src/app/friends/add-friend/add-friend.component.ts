import { Component } from '@angular/core';
import { AccountManagmentService } from 'src/app/account/account-managment.service';
import { User, UserFirebase } from 'src/app/account/account-interfaces/account.interface';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(private accountService: AccountManagmentService) { }

  onSearch() {
    if(this.form.value.searcher == null) {
      return;
    }

    this.accountService.getUserByUsername(this.form.value.searcher, this.userId!)
      .then(users => this.searchedUsers = users);
  }
}
