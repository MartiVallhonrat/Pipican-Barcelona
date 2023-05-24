import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipicanMapsComponent } from './pipican-maps.component';

describe('PipicanMapsComponent', () => {
  let component: PipicanMapsComponent;
  let fixture: ComponentFixture<PipicanMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipicanMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipicanMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
