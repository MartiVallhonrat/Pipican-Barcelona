import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSnackbar2Component } from './custom-snackbar2.component';

describe('CustomSnackbar2Component', () => {
  let component: CustomSnackbar2Component;
  let fixture: ComponentFixture<CustomSnackbar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSnackbar2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSnackbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
