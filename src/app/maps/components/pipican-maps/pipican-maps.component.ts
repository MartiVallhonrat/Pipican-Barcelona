import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from 'mapbox-gl';
import { PlacesServiceService } from '../../services/places-service.service';
import mapboxgl from 'mapbox-gl';
import { Location } from '../../interfaces/maps.interface';

@Component({
  selector: 'app-pipican-maps',
  templateUrl: './pipican-maps.component.html',
  styleUrls: ['./pipican-maps.component.scss']
})
export class PipicanMapsComponent implements AfterViewInit {

  dogAreas?: Location[];

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(private placesService: PlacesServiceService) {}

  ngAfterViewInit(): void {
    
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [ 2.16992, 41.3879],
      zoom: 12,
    });
    const geolocation = map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true,
      showAccuracyCircle: false,
      showUserHeading: true
      })
    );
    console.log(geolocation);

    this.placesService.getPipicans()
      .subscribe(pipicans => {
        for(const location of pipicans) {
          const el = document.createElement('div');
          el.className = 'marker';
  
          const marker = new mapboxgl.Marker(el)
            .setLngLat([location.geo_epgs_4326_y, location.geo_epgs_4326_x])
            .setPopup(
              new mapboxgl.Popup({ offset: 25, closeOnMove: true }) 
                .setHTML(
                  `<div class="text-center" style="width: 200px;">
                    <h3> Pipican ${location.addresses_road_name}</h3>
                    <p>${location.addresses_road_name}<span> - ${location.addresses_start_street_number}</span></p>
                    <div class="d-flex justify-content-center gap-2">
                        <button class="bg-primary border border-primary rounded-circle" style="width: 40px; height: 40px;">
                          <img src="../../../../assets/info.png" alt="info" style="width: 25px; height: 25px;">
                        </button>
                        <button class="bg-white border border-primary rounded-circle" style="width: 40px; height: 40px;">
                          <img src="../../../../assets/direction.png" alt="direction" style="width: 25px; height: 25px;">
                        </button>
                    </div>
                  </div>`
                )
            )
            .addTo(map);
        }
      });
  }
}
