import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenidoCursoPage } from './contenido-curso.page';

describe('ContenidoCursoPage', () => {
  let component: ContenidoCursoPage;
  let fixture: ComponentFixture<ContenidoCursoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
