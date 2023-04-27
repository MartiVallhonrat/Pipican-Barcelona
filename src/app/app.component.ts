import { Component, OnInit } from '@angular/core';
import { AccountManagmentService } from './account/account-managment.service';
import { User, UserFirebase } from './account/account-interfaces/account.interface'; 
import { DocumentData } from 'firebase/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pipican-Barcelona';
  isLoggedIn: boolean = false; 
  userId: string | null = localStorage.getItem("id")
  currentUser!: DocumentData | undefined;

  constructor(private accountService: AccountManagmentService) { }

  ngOnInit() {
    if(this.userId === null) {
      console.log("Incorrect Username");
      return;
    } 
    this.currentUser = this.accountService.getItemById(this.userId);
    
  }
}
