import { Injectable } from '@angular/core';
import User from './account-interfaces/account.interface';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountManagmentService {

  constructor(private firestore: Firestore) { }

  addUser(user: User) {
    const userRef = collection(this.firestore, "users");
    return addDoc(userRef, user);
  }
}
