import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide:boolean = true;
  isSubmited: boolean = false;

  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,10}$")]),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log("su muertooooos")
      return;
    } 
  
  }
}
