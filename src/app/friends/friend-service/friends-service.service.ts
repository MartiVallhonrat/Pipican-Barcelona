import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, arrayUnion, setDoc } from '@angular/fire/firestore';
import { AccountManagmentService } from 'src/app/account/account-managment.service';
import { collection, getDoc } from 'firebase/firestore';

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
    debugger
    const friendListRef = doc(this.firestore, `friends/${this.userId}`);
    const friendListExists = (await getDoc(friendListRef)).exists();

    if(!friendListExists) {
      setDoc(friendListRef, {
        fiendList: arrayUnion(friendId)
      });
    };
    if(friendListExists) {
      updateDoc(friendListRef, {
        fiendList: arrayUnion(friendId)
      });
    };
  }

  async getFriendList() {
    debugger
    const usersFriendListRef = doc(this.firestore, `friends/${this.userId}`)
    const userFriendListSnap = await getDoc(usersFriendListRef);

    if(userFriendListSnap.exists()) {
      const userFriends = userFriendListSnap.data();
      console.log(userFriends["friendList"])
    }
  }
}
