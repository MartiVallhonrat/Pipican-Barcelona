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
  emailError: boolean = false;
  passwordError: boolean = false;


  constructor(private accountService: AccountManagmentService,
              private router: Router) { }

  form = new FormGroup({
    Email: new FormControl("", [Validators.required]),
    Password: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    this.emailError = false;
    this.passwordError = false;

    if (this.form.invalid) {
      return;
    }; 

    this.accountService.getUserByEmail(this.form.value.Email!)
      .then(snapshot => {
        if(snapshot.size === 0) {
          this.emailError = true;
          return;
        }
        snapshot.forEach(doc => {
          const user = doc.data()
          if(user['Password'] !== this.form.value.Password || user == undefined) {
            this.passwordError = true;
            return;
          }

          localStorage.setItem("id", doc.id);
          this.accountService.userIdSubject.next(doc.id);
          this.router.navigate([""]);
        });
        
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      }); 
  }
}

