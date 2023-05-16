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
    this.requestList = this.friendListSubject?.asObservable();
  }

  async sendRequest(friendId: string) {
    const requestListRef = doc(this.firestore, `friends/${friendId}`);
    const requestListExists = (await getDoc(requestListRef)).exists();

    if(!requestListExists) {
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
    const requestIdListData = (await getDoc(requestIdListRef)).get("requestList");
    if(requestIdListData !== undefined) {    
      const requestList: any[] = [];
      const usersRef = collection(this.firestore, "users");
      const usersQuery = query(usersRef, where("id", "in", requestIdListData));
      const usersQuerySnapshot = (await getDocs(usersQuery));
      usersQuerySnapshot.forEach(doc => requestList.push({ id: doc.id, ...doc.data() }))
      this.requestListSubject?.next(requestList);
    }
    onSnapshot(requestIdListRef, async (requestIdListSnap) => {
      if(requestIdListSnap.exists()) {
        const requestIdList = requestIdListSnap.get("requestList");
        const requestList: any[] = [];
        const usersRef = collection(this.firestore, "users");
        const usersQuery = query(usersRef, where("id", "in", requestIdList));
        const usersQuerySnapshot = (await getDocs(usersQuery));
        usersQuerySnapshot.forEach(doc => requestList.push({ id: doc.id, ...doc.data() }))
        this.requestListSubject?.next(requestList);
      } 
    });
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
