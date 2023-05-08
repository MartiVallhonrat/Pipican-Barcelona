import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './account-interfaces/account.interface';
import { UserFirebase } from './account-interfaces/account.interface';
import { Firestore, addDoc, collection, collectionData, docData, doc, where, query, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountManagmentService {

  public userIdSubject: BehaviorSubject<string | null>;
  public userId: Observable<string | null>;

  constructor
  (private firestore: Firestore,
    private router: Router
    ) {
      this.userIdSubject = new BehaviorSubject(localStorage.getItem("id"))
      this.userId = this.userIdSubject.asObservable();
    }

  addUser(user: User) {
    const userRef = collection(this.firestore, "users");
    return addDoc(userRef, user);
  }

  logout() {
    localStorage.removeItem('id');
    this.router.navigate(['/account']);
    this.userIdSubject.next(null);
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

  updateUser(user: UserFirebase) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, {...user});
  }

  async deleteUser(id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    await deleteDoc(userDocRef);
    //deleteObject(ref(this.storage, `images/${this.userId}`));
    await this.logout();
  }
}
