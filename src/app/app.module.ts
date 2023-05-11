import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FriendsComponent } from './friends/friends.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { AddFriendComponent } from './friends/add-friend/add-friend.component';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    FriendsComponent,
    FriendsListComponent,
    AddFriendComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
