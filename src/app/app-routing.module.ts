import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './helpers/auth-guard.service';

const accountModule = () => import("./account/account.module").then(x => x.AccountModule)

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: "account", loadChildren: accountModule},
  {path: "home", component: HomeComponent, canActivate:[AuthGuardService]},
  {path: "about-us", component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
