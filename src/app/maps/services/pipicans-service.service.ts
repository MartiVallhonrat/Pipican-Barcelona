import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collection , collectionData, doc, docData, getDoc, getDocs } from '@angular/fire/firestore';
import { Pipicans } from '../interfaces/pipicans';
import { arrayUnion, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';
import { AccountManagmentService } from 'src/app/account/account-managment.service';
import { User, UserFirebase } from 'src/app/account/account-interfaces/account.interface';
import { FriendsServiceService } from 'src/app/friends/friend-service/friends-service.service';

@Injectable({
  providedIn: 'root'
})
export class PipicansServiceService {
  pipicanId?: string;
  userId: string | null = localStorage.getItem("id");
  currentUser?: UserFirebase;
  pipican?: Pipicans;
  public notificationListSubject?: BehaviorSubject<any[]>;
  public notificationList?: Observable<any[]>

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private accountService: AccountManagmentService,
    private friendService: FriendsServiceService
  ) 
  {
    this.notificationListSubject = new BehaviorSubject<any[]>([]);
    this.notificationList = this.notificationListSubject?.asObservable();

    this.accountService.getItemById(this.userId!)
      .subscribe(user => {
        this.currentUser = user;
      })

    this.accountService.userId
      .subscribe(userId => {
        this.userId = userId;
      })
  }

  getItemById(id: string): Observable<Pipicans> {
    this.pipicanId = id;
    const pipicansDocRef = doc(this.firestore, `pipicans/${id}`);
    return docData(pipicansDocRef, { idField: "id" }) as Observable<Pipicans>;
  }

  async updateRating(rating: number | null) {
    const pipicanDoc = doc(this.firestore, `pipicans/${this.pipicanId}`);
    const pipicanDocData = (await getDoc(pipicanDoc));
    const newTotalRating = (await pipicanDocData.get("totalRating")) + rating;
    const newCountRating = (await pipicanDocData.get("countRating")) + 1;
    updateDoc(pipicanDoc, {
      totalRating: newTotalRating,
      countRating: newCountRating
    })
  }

  async onSelectFile(e: any) {
    if(e.target.files){
      const file = e.target.files[0];
      const imgRef = ref(this.storage, `images/${this.pipicanId}/${file.name}`);
      await uploadBytes(imgRef, file);
      await getDownloadURL(imgRef)
        .then(async (url) => {
          const pipicanDoc = doc(this.firestore, `pipicans/${this.pipicanId}`);
          updateDoc(pipicanDoc, {
            images: arrayUnion(url)
          });
        })
    }
  }

  async sendNotifications(message: string | null) {
    const friendsIdListRef = doc(this.firestore, `friends/${this.userId}`);
    const friendsIdListSnap = await getDoc(friendsIdListRef)
      if(friendsIdListSnap.exists() && friendsIdListSnap.get("friendList") !== undefined && friendsIdListSnap.get("friendList").length !== 0) {
        const friendsIdList = await friendsIdListSnap.get("friendList");
        const usersRef = collection(this.firestore, "users");
        const usersQuery = query(usersRef, where("id", "in", friendsIdList));
        const usersQuerySnapshot = await getDocs(usersQuery);
        usersQuerySnapshot.forEach(async user => {
          const friendNotificationsRef = doc(this.firestore, `notifications/${user.id}`);
          const senderFriendListExists = (await getDoc(friendNotificationsRef)).exists();
          const date = new Date;
          const hour = date.getHours();
          const minutes = date.getMinutes();
          if(senderFriendListExists) {
            updateDoc(friendNotificationsRef, {
              notifications: arrayUnion(
                {
                  senderId: this.userId,
                  message: message,
                  timestamp: `${hour}:${minutes}`,
                  pipicanName: this.pipican?.addresses_road_name,
                  pipicanId: this.pipicanId
                })
            });
          } else {
            setDoc(friendNotificationsRef, {
              notifications: arrayUnion(
                {
                  senderId: this.userId,
                  message: message,
                  timestamp: `${hour}:${minutes}`,
                  pipicanName: this.pipican?.addresses_road_name,
                  pipicanId: this.pipicanId
                })
            });
          };
        })
      } else {
        return;
      }
  }

  async getNotificationList() {
    const notificationsRef = doc(this.firestore, `notifications/${this.userId}`);
    onSnapshot(notificationsRef, async (notificationsSnap) => {
      if(notificationsSnap.exists() && notificationsSnap.get("notifications") !== undefined && notificationsSnap.get("notifications").length !== 0) {
        const notificationsList = await notificationsSnap.get("notifications");
        const notificationsListId: any = [];
        notificationsList.forEach((notification: any) => {
          notificationsListId.push(notification.senderId);
        })
        const usersRef = collection(this.firestore, "users");
        const usersQuery = query(usersRef, where("id", "in", notificationsListId));
        const usersQuerySnapshot = await getDocs(usersQuery);
        usersQuerySnapshot.forEach(doc => {
          notificationsList.forEach((noti: { senderId: string; senderInfo: { [x: string]: any; }; }) => {
            if(noti.senderId == doc.id) {
              noti.senderInfo = {...doc.data()};
            }
          })
        });
        this.notificationListSubject?.next(notificationsList);
      } else {
        this.notificationListSubject?.next([]);
      }
    });
  }
}
