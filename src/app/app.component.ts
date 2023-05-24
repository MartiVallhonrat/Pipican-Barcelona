import { Component, OnInit } from '@angular/core';
import { AccountManagmentService } from './account/account-managment.service';
import { UserFirebase } from './account/account-interfaces/account.interface'; 
import { PlacesServiceService } from './maps/services/places-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pipican-Barcelona';
  isLoggedIn: boolean = false; 
  userId!: string | null;
  currentUser?: UserFirebase;
  urlImage: string = "../assets/profile-placeholder.jpg"

  constructor(
    private accountService: AccountManagmentService
    ) {
    this.accountService.userId.subscribe(x => {
      this.userId = x;
      this.ngOnInit();
      if(x == null) {
        this.urlImage = "../assets/profile-placeholder.jpg";
      }
    });
  }

  ngOnInit() {
    if(this.userId == null) {
      this.currentUser = undefined;
      return;
    } 
    this.accountService.getItemById(this.userId)
      .subscribe(user => {
        this.currentUser = user;
        if(this.currentUser == undefined){
          return;
        }
        if(this.currentUser.ProfileImage !== null){
          this.urlImage = this.currentUser.ProfileImage;
        } else {
          this.urlImage = "../assets/profile-placeholder.jpg";
        };  

      });
  }
}
