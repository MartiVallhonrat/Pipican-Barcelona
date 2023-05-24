import { Component } from '@angular/core';
import { PlacesServiceService } from '../../services/places-service.service';

@Component({
  selector: 'app-pipican-maps',
  templateUrl: './pipican-maps.component.html',
  styleUrls: ['./pipican-maps.component.scss']
})
export class PipicanMapsComponent {

  dogAreas: any;

  constructor(private placesService: PlacesServiceService) 
  {
    this.placesService.getPipicans()
      .subscribe(pipicans => this.dogAreas = pipicans)
  }

}
