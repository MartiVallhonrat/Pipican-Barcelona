import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, arrayUnion, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { AccountManagmentService } from 'src/app/account/account-managment.service';
import { arrayRemove, collection, getDoc, onSnapshot } from 'firebase/firestore';
import { User, UserFirebase } from 'src/app/account/account-interfaces/account.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsServiceService {

  userId = localStorage.getItem("id");
  public friendListSubject?: BehaviorSubject<any[]>;
  public friendList?: Observable<UserFirebase[]>

  public requestListSubject?: BehaviorSubject<any[]>;
  public requestList?: Observable<UserFirebase[]>

  constructor(
    private accountService: AccountManagmentService,
    private firestore: Firestore
  ) {
    this.friendListSubject = new BehaviorSubject<UserFirebase[]>([]);
    this.friendList = this.friendListSubject?.asObservable();

    this.requestListSubject = new BehaviorSubject<UserFirebase[]>([]);
    this.requestList = this.requestListSubject?.asObservable();

    this.accountService.userId.subscribe(x => this.userId = x)
  }

  async sendRequest(friendId: string) {
    debugger
    const requestListRef = doc(this.firestore, `friends/${friendId}`);
    const requestListExists = (await getDoc(requestListRef)).exists();

    if(requestListExists == false) {
      setDoc(requestListRef, {
        requestList: arrayUnion(this.userId)
      });
    };
    if(requestListExists) {
      updateDoc(requestListRef, {
        requestList: arrayUnion(this.userId)
      });
    };
  }

  async acceptFriend(friendId: string) {
    const accepterFriendListRef = doc(this.firestore, `friends/${this.userId}`);
    const accepterFriendListExists = (await getDoc(accepterFriendListRef)).exists();

    const senderFriendListRef = doc(this.firestore, `friends/${friendId}`);
    const senderFriendListExists = (await getDoc(senderFriendListRef)).exists();

    if(accepterFriendListExists) {
      updateDoc(accepterFriendListRef, {
        friendList: arrayUnion(friendId),
        requestList: arrayRemove(friendId)
      });
    };

    if(senderFriendListExists) {
      updateDoc(senderFriendListRef, {
        friendList: arrayUnion(this.userId)
      });
    };
    if(!senderFriendListExists) {
      setDoc(senderFriendListRef, {
        friendList: arrayUnion(this.userId)
      });
    }
  }

  async rejectFriend(friendId: string) {
    const rejecterFriendListRef = doc(this.firestore, `friends/${this.userId}`);
    const rejecterFriendListExists = (await getDoc(rejecterFriendListRef)).exists();

    if(rejecterFriendListExists) {
      updateDoc(rejecterFriendListRef, {
        requestList: arrayRemove(friendId)
      });
    };
  }

  async getRequestList() {
    const requestIdListRef = doc(this.firestore, `friends/${this.userId}`);
    onSnapshot(requestIdListRef, async (requestIdListSnap) => {
      debugger
      if(requestIdListSnap.exists() && requestIdListSnap.get("requestList") !== undefined && requestIdListSnap.get("requestList").length !== 0) {
        const requestIdList = await requestIdListSnap.get("requestList");
        const requestList: any[] = [];
        const usersRef = collection(this.firestore, "users");
        const usersQuery = await query(usersRef, where("id", "in", requestIdList));
        const usersQuerySnapshot = (await getDocs(usersQuery));
        usersQuerySnapshot.forEach(doc => requestList.push({ id: doc.id, ...doc.data() }))
        this.requestListSubject?.next(requestList);
      } else {
        this.requestListSubject?.next([]);
      }
    });
  }

  async getFriendList() {
    const friendsIdListRef = doc(this.firestore, `friends/${this.userId}`);
    onSnapshot(friendsIdListRef, async (friendsIdListSnap) => {
      debugger
      if(friendsIdListSnap.exists() && friendsIdListSnap.get("friendList") !== undefined && friendsIdListSnap.get("friendList").length !== 0) {
        const friendsIdList = await friendsIdListSnap.get("friendList");
        const friendsList: any[] = [];
        const usersRef = collection(this.firestore, "users");
        const usersQuery = await query(usersRef, where("id", "in", friendsIdList));
        const usersQuerySnapshot = (await getDocs(usersQuery));
        usersQuerySnapshot.forEach(doc => friendsList.push({ id: doc.id, ...doc.data() }))
        this.friendListSubject?.next(friendsList);
      } else {
        this.friendListSubject?.next([]);
      }
    });
  }

  async removeFriend(friendId: string) {
    const localIdListRef = doc(this.firestore, `friends/${this.userId}`);
    const localIdListExists = (await getDoc(localIdListRef)).exists();

    const friendIdListRef = doc(this.firestore, `friends/${friendId}`);
    const friendIdListExists = (await getDoc(friendIdListRef)).exists();

    if(localIdListExists) {
      updateDoc(localIdListRef, {
        friendList: arrayRemove(friendId)
      });
    };
    if(friendIdListExists) {
      updateDoc(friendIdListRef, {
        friendList: arrayRemove(this.userId)
      });
    };
  }
}
