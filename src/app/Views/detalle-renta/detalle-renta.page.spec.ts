import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleRentaPage } from './detalle-renta.page';

describe('DetalleRentaPage', () => {
  let component: DetalleRentaPage;
  let fixture: ComponentFixture<DetalleRentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
