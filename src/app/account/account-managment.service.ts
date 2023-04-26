import { Injectable } from '@angular/core';
import User from './account-interfaces/account.interface';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AccountManagmentService {

  constructor(private firestore: Firestore) { }

  addUser(user: User) {
    const userRef = collection(this.firestore, "users");
    return addDoc(userRef, user);
  }

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, "users");
    return collectionData(userRef) as Observable<User[]>;
  }
}
