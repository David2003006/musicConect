import { TestBed } from '@angular/core/testing';

import { ListaCarritoServicesService } from './lista-carrito.services.service';

describe('ListaCarritoServicesService', () => {
  let service: ListaCarritoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaCarritoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
