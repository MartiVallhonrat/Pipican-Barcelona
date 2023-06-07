import { Component } from '@angular/core';
import { PipicansServiceService } from '../maps/services/pipicans-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  notificationList: any = []

  constructor(
    private pipicanService: PipicansServiceService
  ) 
  {
    this.pipicanService.getNotificationList();
    this.pipicanService.notificationList?.subscribe(x => {
    this.notificationList = x;
    console.log(this.notificationList)
  })
  }
}
