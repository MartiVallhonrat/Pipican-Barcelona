import { Injectable } from '@angular/core';
import { User } from './account-interfaces/account.interface';
import { UserFirebase } from './account-interfaces/account.interface';
import { Firestore, addDoc, collection, collectionData, getFirestore, doc, getDoc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountManagmentService {
  db = getFirestore();

  constructor(private firestore: Firestore) { }

  addUser(user: User) {
    const userRef = collection(this.firestore, "users");
    return addDoc(userRef, user);
  }

  getUsers(): Observable<UserFirebase[]> {
    const userRef = collection(this.firestore, "users");
    return collectionData(userRef, { idField: "id" }) as Observable<UserFirebase[]>;
  }

  getItemById(id: string): Observable<any> {
    return collectionData(collection(this.firestore, 'users'),);
  }
    
}
