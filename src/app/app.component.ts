import { Component, OnInit } from '@angular/core';
import { AccountManagmentService } from './account/account-managment.service';
import { UserFirebase } from './account/account-interfaces/account.interface'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pipican-Barcelona';
  isLoggedIn: boolean = false; 
  userId: string | null = localStorage.getItem("id")
  currentUser?: UserFirebase;

  constructor(private accountService: AccountManagmentService) { }

  ngOnInit() {
    if(this.userId === null) {
      return;
    } 
    this.accountService.getItemById(this.userId)
      .subscribe(user => {
        this.currentUser = user;
        console.log(this.currentUser);  
      });
  }
}
