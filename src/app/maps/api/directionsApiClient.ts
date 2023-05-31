import { Injectable } from '@angular/core'
import { HttpClient, HttpHandler } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class DirectionsApiClients extends HttpClient {

    public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/walking';
    
    constructor ( handler: HttpHandler){
        super(handler);
    }

    public override get<T>(url: string) {
        
        url = this.baseUrl + url;

        return super.get<T>(url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                access_token: 'pk.eyJ1IjoibWFydGl2YWxsIiwiYSI6ImNsaTRyNzVqMjBvZHozbW96M3A4ZWV3ZnUifQ.qh5ODQ2KdPNMlYeLWkiXdg'
            }
        })
    }
}