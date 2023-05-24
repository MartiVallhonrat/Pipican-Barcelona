import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection , collectionData, addDoc } from '@angular/fire/firestore';
import { Location } from '../interfaces/maps.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesServiceService {

  constructor(
    private firestore: Firestore
    ) {}

    getPipicans(): Observable<Location[]> {

      const pipicansRef = collection(this.firestore, "pipicans");
      return collectionData(pipicansRef, { idField: "id" }) as Observable<Location[]>;
    }
  }