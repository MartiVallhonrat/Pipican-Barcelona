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
    Username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,10}$")]),
    ProfileImage: new FormControl("https://firebasestorage.googleapis.com/v0/b/pipican-barcelona.appspot.com/o/images%2Fuser-defualt.png?alt=media&token=1235e277-175a-4c6f-a7d8-23fd2b04ff47"),
    DogBreed: new FormControl(null)
  });

  onSubmit() {
    debugger
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
      .catch(async error => {
        console.log("Error getting documents: ", error);
      }); 
  }
}
