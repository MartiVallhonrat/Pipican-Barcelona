import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountManagmentService } from '../account-managment.service';
import User from '../account-interfaces/account.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide:boolean = true;

  constructor(
    private accountService: AccountManagmentService,
    ) {}

  form = new FormGroup({
    Username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,10}$")]),
    ProfileImage: new FormControl(null),
    DogBreed: new FormControl(null)
  });

  async onSubmit() {
    if (this.form.invalid) {
      return;
    } 

    const foundEmail = await this.accountService.getUsers().find((user: User) => user.Email == this.form.value.Email);
    if(foundEmail !== undefined) {
      return;
    }

    const response = await this.accountService.addUser(this.form.value);
    console.log(response);
  }
}
