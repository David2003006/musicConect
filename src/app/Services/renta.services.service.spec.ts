import { TestBed } from '@angular/core/testing';

import { RentaServicesService } from './renta.services.service';

describe('RentaServicesService', () => {
  let service: RentaServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentaServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
