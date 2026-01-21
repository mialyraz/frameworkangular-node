import { TestBed } from '@angular/core/testing';

import { PrimengService } from './primeng.service';

describe('PrimengService', () => {
  let service: PrimengService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimengService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
