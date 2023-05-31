import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSnackbarComponent } from './photo-snackbar.component';

describe('PhotoSnackbarComponent', () => {
  let component: PhotoSnackbarComponent;
  let fixture: ComponentFixture<PhotoSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
