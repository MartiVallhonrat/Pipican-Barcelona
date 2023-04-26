import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountManagmentService } from '../account-managment.service';
import User from '../account-interfaces/account.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide:boolean = true;
  notFoundUser?: boolean = false;
  notMatchingPassword?: boolean = false;


  constructor(private accountService: AccountManagmentService) { }

  form = new FormGroup({
    Email: new FormControl("", [Validators.required]),
    Password: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    this.notFoundUser = false;
    this.notMatchingPassword = false;

    if (this.form.invalid) {
      return;
    }; 

    this.accountService.getUsers() 
      .subscribe(users => {
        debugger
        const foundUser = users.find((user: User) => user.Email == this.form.value.Email);
        console.log(foundUser);
        if(foundUser == undefined) {
          this.notFoundUser= true;
          return;
        };

        const matchPassword = foundUser.Password == this.form.value.Password
        console.log(matchPassword);
        if(matchPassword == false) {
          this.notMatchingPassword= true;
          return;
        };

        console.log("login succes")
      });
  }
}

