import { TestBed } from '@angular/core/testing';

import { AccountManagmentService } from './account-managment.service';

describe('AccountManagmentService', () => {
  let service: AccountManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
