import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountManagmentService } from '../account-managment.service';
import { UserFirebase } from '../account-interfaces/account.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide:boolean = true;
  customError: boolean = false;


  constructor(private accountService: AccountManagmentService,
              private router: Router) { }

  form = new FormGroup({
    Email: new FormControl("", [Validators.required]),
    Password: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    this.customError = false

    if (this.form.invalid) {
      return;
    }; 

    this.accountService.getUserByEmail(this.form.value.Email!)
      .then(async snapshot => {
        debugger
        if(snapshot.size === 0) {
          this.customError = true;
        }
        if(snapshot.size === 1) {
          this.customError = true;
        }
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      }); 
  }
}

