import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsNotificationsComponent } from './friends-notifications.component';

describe('FriendsNotificationsComponent', () => {
  let component: FriendsNotificationsComponent;
  let fixture: ComponentFixture<FriendsNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
