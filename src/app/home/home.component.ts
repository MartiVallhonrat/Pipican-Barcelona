import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { PipicansServiceService } from '../maps/services/pipicans-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  notificationList: any = []

  constructor(
    private pipicanService: PipicansServiceService,
    private changeDetectorRef: ChangeDetectorRef
  ) 
  { }
  ngOnInit(): void {
    this.pipicanService.getNotificationList();
    this.pipicanService.notificationList?.subscribe(x => {
      this.notificationList = x;
      this.changeDetectorRef.detectChanges();
    })
  }
}
