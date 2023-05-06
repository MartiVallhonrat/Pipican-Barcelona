import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountManagmentService } from '../account-managment.service';
import { User } from '../account-interfaces/account.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide:boolean = true;
  customError?: boolean;

  constructor(
    private accountService: AccountManagmentService,
    ) {}

  form = new FormGroup({
    Username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{1,10}$")]),
    ProfileImage: new FormControl(null),
    DogBreed: new FormControl(null)
  });

  onSubmit() {
    this.customError = false;

    if (this.form.invalid) {
      return;
    } 

    this.accountService.getUserByEmail(this.form.value.Email!)
      .then(async snapshot => {
        if(snapshot.size === 0) {
          const addedUser = await this.accountService.addUser(this.form.value);
          localStorage.setItem("id", addedUser.id);
          window.location.replace("");
        } else {
          this.customError = true;
        }
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      }); 
  }
}
