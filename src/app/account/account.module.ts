import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing/account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ConfimationDialogComponent } from './edit-account/confimation-dialog/confimation-dialog.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EditAccountComponent,
    ConfimationDialogComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
