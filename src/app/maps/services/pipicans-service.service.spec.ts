import { TestBed } from '@angular/core/testing';

import { PipicansServiceService } from './pipicans-service.service';

describe('PipicansServiceService', () => {
  let service: PipicansServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipicansServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
