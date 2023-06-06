import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountManagmentService } from '../account-managment.service';
import { Router } from '@angular/router';


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
    private router: Router
    ) {}

  form = new FormGroup({
    Username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
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
          this.accountService.userIdSubject.next(addedUser.id);
          this.router.navigate([""]);
        } else {
          this.customError = true;
        }
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      }); 
  }
}
