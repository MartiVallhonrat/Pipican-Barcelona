import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection , collectionData, addDoc } from '@angular/fire/firestore';
import { Pipicans } from '../interfaces/pipicans';
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

    getPipicans(): Observable<Pipicans[]> {

      const pipicansRef = collection(this.firestore, "pipicans");
      return collectionData(pipicansRef, { idField: "id" }) as Observable<Pipicans[]>;
    }

    getRouteBetweenPoints(start: [number, number], end: [number, number], map: any) {
      this.directionsApi.get<any>(`/${start.join(',')};${end.join(',')}`)
        .subscribe(resp => {
          if (resp.routes && resp.routes.length > 0 && resp.routes[0] !== undefined) {
            this.drawPolyline(resp.routes[0], map)
          } else {
            console.error('No routes found');
          }});
    }

    private drawPolyline(route: any, map: any) {

      const coords = route.geometry.coordinates;

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

      if(map.getLayer("RouteString")) {
        map.removeLayer("RouteString");
        map.removeSource("RouteString");
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