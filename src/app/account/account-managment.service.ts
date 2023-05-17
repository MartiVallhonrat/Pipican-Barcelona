import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './account-interfaces/account.interface';
import { UserFirebase } from './account-interfaces/account.interface';
import { Firestore, addDoc, collection, collectionData, doc, where, query, getDocs, QuerySnapshot, docData, getDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, listAll } from 'firebase/storage';
import { Storage, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AccountManagmentService {

  public userIdSubject: BehaviorSubject<string | null>;
  public userId: Observable<string | null>;

  constructor
  (private firestore: Firestore,
    private router: Router,
    private storage: Storage,
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
  async getUserByUsername(username: string, id: string): Promise<UserFirebase[] | undefined> {
    let result: any[] = []
    const userRef = collection(this.firestore, "users");
    const friendIdListRef = doc(this.firestore, `friends/${this.userId}`);
    const friendIdListData = (await getDoc(friendIdListRef)).get("friendList");
    console.log(friendIdListData)
    let usersQuery
    if(friendIdListData == undefined){
      usersQuery = query(userRef, where("Username", "==", username));
    } else {
      usersQuery = query(userRef, where("Username", "==", username), where("id", "not-in", friendIdListData));
    }

    const usersQuerySnapshot = await getDocs(usersQuery);
    await usersQuerySnapshot.forEach(doc => {
      if(doc.id == id) {
        return;
      }
      result.push({ id: doc.id, ...doc.data()});
    })
    return result;
  }

  updateUser(user: UserFirebase) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, {...user});
  }

  async deleteUser(id: string) {
    this.logout();
    const userDocRef = doc(this.firestore, `users/${id}`);
    await deleteDoc(userDocRef);
    
    const folderRef = ref(this.storage, `images/${id}`)
    await listAll(folderRef)
      .then(file => {
        if(file.items.length == 0) {
          return;
        }
        file.items.forEach(itemRef => {
          deleteObject(itemRef);
        });
      });
  }
}
