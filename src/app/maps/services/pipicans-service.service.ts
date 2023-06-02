import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection , collectionData, doc, docData, getDoc } from '@angular/fire/firestore';
import { Pipicans } from '../interfaces/pipicans';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class PipicansServiceService {
  pipicanId?: string;

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) {}

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
}
