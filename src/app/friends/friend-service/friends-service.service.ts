import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, arrayUnion, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { AccountManagmentService } from 'src/app/account/account-managment.service';
import { collection, getDoc, onSnapshot } from 'firebase/firestore';
import { User, UserFirebase } from 'src/app/account/account-interfaces/account.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsServiceService {

  userId = localStorage.getItem("id");
  public friendListSubject?: BehaviorSubject<any[]>;
  public friendList?: Observable<UserFirebase[]>

  constructor(
    private accountService: AccountManagmentService,
    private firestore: Firestore
  ) {
    this.friendListSubject = new BehaviorSubject<UserFirebase[]>([]);
    this.friendList = this.friendListSubject?.asObservable();
  }

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

  async getFriendList() {
    const friendsIdListRef = doc(this.firestore, `friends/${this.userId}`);
    const friendIdListData = (await getDoc(friendsIdListRef)).get("friendList");
    if(friendIdListData !== undefined) {    
      const friendsList: any[] = [];
      const usersRef = collection(this.firestore, "users");
      const usersQuery = query(usersRef, where("id", "in", friendIdListData));
      const usersQuerySnapshot = (await getDocs(usersQuery));
      usersQuerySnapshot.forEach(doc => friendsList.push({ id: doc.id, ...doc.data() }))
      this.friendListSubject?.next(friendsList);
    }
    onSnapshot(friendsIdListRef, async (friendsIdListSnap) => {
      if(friendsIdListSnap.exists()) {
        const friendsIdList = friendsIdListSnap.get("friendList");
        const friendsList: any[] = [];
        const usersRef = collection(this.firestore, "users");
        const usersQuery = query(usersRef, where("id", "in", friendsIdList));
        const usersQuerySnapshot = (await getDocs(usersQuery));
        usersQuerySnapshot.forEach(doc => friendsList.push({ id: doc.id, ...doc.data() }))
        this.friendListSubject?.next(friendsList);
      } 
    });
  }
}
