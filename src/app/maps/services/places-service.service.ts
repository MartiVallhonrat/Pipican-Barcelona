import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection , collectionData, addDoc } from '@angular/fire/firestore';
import { Location } from '../interfaces/maps.interface';
import { DirectionsApiClients } from '../api/directionsApiClient';
import { AnySourceData } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class PlacesServiceService {

  constructor(
    private firestore: Firestore,
    private directionsApi: DirectionsApiClients
  ) {}

    getPipicans(): Observable<Location[]> {

      const pipicansRef = collection(this.firestore, "pipicans");
      return collectionData(pipicansRef, { idField: "id" }) as Observable<Location[]>;
    }

    getRouteBetweenPoints(start: [number, number], end: [number, number], map: any) {
      debugger
      this.directionsApi.get<any>(`/${start.join(',')};${end.join(',')}`)
        .subscribe(resp => {
          console.log(resp)
          if (resp.routes && resp.routes.length > 0 && resp.routes[0] !== undefined) {
            console.log(resp.routes[0]);
            this.drawPolyline(resp.routes[0], map)
          } else {
            console.error('No routes found');
          }});
    }

    private drawPolyline(route: any, map: any) {
      debugger
      console.log({distance: route.distance, duration: route.duration / 60});

      const coords = route.geometry.coordinates;
      console.log(coords)

      const sourceData: AnySourceData = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coords
              }
            }
          ]
        }
      }

      map.addSource('RouteString', sourceData);

      map.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          "line-color": 'black',
          "line-width": 3
        }
      })
    }
  }