import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSnackbarComponent } from './rating-snackbar.component';

describe('RatingSnackbarComponent', () => {
  let component: RatingSnackbarComponent;
  let fixture: ComponentFixture<RatingSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
