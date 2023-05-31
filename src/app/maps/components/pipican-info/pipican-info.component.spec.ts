import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipicanInfoComponent } from './pipican-info.component';

describe('PipicanInfoComponent', () => {
  let component: PipicanInfoComponent;
  let fixture: ComponentFixture<PipicanInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipicanInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipicanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
