import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, arrayUnion, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { AccountManagmentService } from 'src/app/account/account-managment.service';
import { collection, getDoc, onSnapshot } from 'firebase/firestore';
import { UserFirebase } from 'src/app/account/account-interfaces/account.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsServiceService {

  userId = localStorage.getItem("id");

  constructor(
    private accountService: AccountManagmentService,
    private firestore: Firestore
  ) { }

  async addFriend(friendId: string) {
    const friendListRef = doc(this.firestore, `friends/${this.userId}`);
    const friendListExists = (await getDoc(friendListRef)).exists();

    if(!friendListExists) {
      setDoc(friendListRef, {
        friendList: arrayUnion(friendId)
      });
    };
    if(friendListExists) {
      updateDoc(friendListRef, {
        friendList: arrayUnion(friendId)
      });
    };
  }

  getFriendList(): Observable<UserFirebase[]> {
    debugger
    let result: UserFirebase[] = [];
    
    const friendsIdListRef = doc(this.firestore, `friends/${this.userId}`);
    onSnapshot(friendsIdListRef, async (friendsIdListSnap) => {
      if(friendsIdListSnap.exists()) {
        debugger
        const friendsIdList = friendsIdListSnap.get("friendList");
        
        const friendsList: any[] = [];
        const usersRef = collection(this.firestore, "users");
        const usersQuery = query(usersRef, where("id", "in", friendsIdList));
        const usersQuerySnapshot = (await getDocs(usersQuery));
        usersQuerySnapshot.forEach(doc => friendsList.push({ id: doc.id, ...doc.data() }))
        result = friendsList;
      } 
    });

    return result as unknown as Observable<UserFirebase[]>;
  }
}
