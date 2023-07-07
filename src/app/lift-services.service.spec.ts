import { TestBed } from '@angular/core/testing';

import { LiftServicesService } from './lift-services.service';

describe('LiftServicesService', () => {
  let service: LiftServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiftServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
