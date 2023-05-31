import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from 'mapbox-gl';
import { PlacesServiceService } from '../../services/places-service.service';
import mapboxgl from 'mapbox-gl';
import { Location } from '../../interfaces/maps.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pipican-maps',
  templateUrl: './pipican-maps.component.html',
  styleUrls: ['./pipican-maps.component.scss']
})
export class PipicanMapsComponent implements AfterViewInit {

  dogAreas?: Location[];

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;
  isGeoLocationOn: boolean = false;

  constructor
  (private placesService: PlacesServiceService,
    private router: Router) {}

  ngAfterViewInit(): void {
    
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [ 2.16992, 41.3879],
      zoom: 12,
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true,
      showAccuracyCircle: false,
      showUserHeading: true
      })
    const geolocation = map.addControl(geolocate);

    geolocate.on('trackuserlocationstart', (e) => {
      this.isGeoLocationOn = true;
      console.log("on");
    });
    geolocate.on('trackuserlocationend', (e) => {
      this.isGeoLocationOn = false;
      console.log("off");
    });

    this.placesService.getPipicans()
      .subscribe(pipicans => {
        for(const location of pipicans) {
          const el = document.createElement('div');
          el.className = 'marker';

          const innerHtmlContent = 
          `<div class="text-center" style="width: 200px;">
            <h3> Pipican ${location.addresses_road_name}</h3>
            <p>${location.addresses_road_name}<span> - ${location.addresses_start_street_number}</span></p>
          </div>`;          
  
          const divElement = document.createElement('div');
          const divButtons = document.createElement('div');
          const assignBtn1 = document.createElement('div');
          const assignBtn2 = document.createElement('div');

          divButtons.className = "d-flex justify-content-center gap-2";

          assignBtn1.innerHTML = 
          `<button class="bg-primary border border-primary rounded-circle" style="width: 40px; height: 40px;">
            <img src="../../../../assets/info.png" alt="info" style="width: 25px; height: 25px;">
          </button>`

          assignBtn2.innerHTML = 
          `<button class="bg-white border border-primary rounded-circle" style="width: 40px; height: 40px;">
            <img src="../../../../assets/direction.png" alt="direction" style="width: 25px; height: 25px;">
          </button>`

          divButtons.appendChild(assignBtn1);
          divButtons.appendChild(assignBtn2);

          divElement.innerHTML = innerHtmlContent;
          divElement.appendChild(divButtons);

          assignBtn1.addEventListener('click', () => {
            this.router.navigate([`/pipicans/info/${location.id}`]);;
          });
          assignBtn2.addEventListener('click', () => {
            if(!this.isGeoLocationOn) {geolocate.trigger()};
            geolocate.on('geolocate', (e) => {
              debugger
              console.log(e)
            });
          });

          const marker = new mapboxgl.Marker(el)
            .setLngLat([location.geo_epgs_4326_y, location.geo_epgs_4326_x])
            .setPopup(
              new mapboxgl.Popup({ offset: 25, closeOnMove: true }) 
                .setDOMContent(divElement)
            )
            .addTo(map);
        }
      });
  }
}
