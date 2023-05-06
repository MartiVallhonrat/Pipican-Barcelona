import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { AuthGuardService } from 'src/app/helpers/auth-guard.service';

const routes : Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "edit-account", component: EditAccountComponent, canActivate:[AuthGuardService]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
