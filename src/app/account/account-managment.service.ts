import { Injectable } from '@angular/core';
import { User } from './account-interfaces/account.interface';
import { UserFirebase } from './account-interfaces/account.interface';
import { Firestore, addDoc, collection, collectionData, docData, doc, where, query, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountManagmentService {

  constructor(private firestore: Firestore) { }

  addUser(user: User) {
    const userRef = collection(this.firestore, "users");
    return addDoc(userRef, user);
  }

  getUsers(): Observable<UserFirebase[]> {
    const userRef = collection(this.firestore, "users");
    return collectionData(userRef, { idField: "id" }) as Observable<UserFirebase[]>;
  }

  getItemById(id: string): Observable<UserFirebase> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: "id" }) as Observable<UserFirebase>;
  }

  async getUserByEmail(email: string): Promise<QuerySnapshot> {
    const userRef = collection(this.firestore, "users");
    const emailQuery = query(userRef, where("Email", "==", email));
    return await getDocs(emailQuery);
  }
}
