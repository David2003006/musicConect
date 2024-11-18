import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { Curso } from 'src/app/Models/Interfaces';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.page.html',
  styleUrls: ['./detalle-curso.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    CommonModule
  ]
})
export class DetalleCursoPage implements OnInit {

  @Input() cursoId!: string; // Recibe el ID del curso
  loading: boolean = true; 
  curso?: Curso;
  constructor(
    private fireStoreServices: FirestoreDatabaseService,  // Servicio para obtener el curso
    private route: ActivatedRoute,  // Para obtener el ID del curso desde la URL
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');  // 'idCurso' debe coincidir con el nombre en la ruta
    console.log("El ID del curso es: " + id);
    if (id) {
      this.obtenerCurso(id);
    }
  }
  obtenerCurso(CursoID: string) {
    this.fireStoreServices.getCursoByField(CursoID).subscribe({
      next: (curso) => {
        this.curso = curso;
        console.log('Curso obtenido:', this.curso);
        this.loading = false; // Finaliza el estado de carga
      },
      error: (err) => {
        console.error('Error al obtener el curso:', err);
        this.loading = false; // Finaliza el estado de carga en caso de error
      },
    });
  }

  agregarAlCarrito() {
    // Obtener los valores seleccionados para el tipo de renta y el plazo
    const tipoRentaSeleccionado = (document.querySelector('#tipoRenta select') as HTMLSelectElement).value;
    const plazoIngresado = parseInt((document.querySelector('#plazo input') as HTMLInputElement).value, 10);
    // Validación para asegurarse de que los datos son válidos
    if (!plazoIngresado || plazoIngresado <= 0) {
      alert('Por favor ingrese un plazo válido.');
      return;
    }
    // Navegar al carrito, pasando los parámetros necesarios
    this.navCtrl.navigateForward(`/lista-carrito`, {
      queryParams: {
        idCurso: this.curso?.CursoID,
        tipoRenta: tipoRentaSeleccionado,
        plazo: plazoIngresado
      }
    });

  }
  get requisitos(): string[] {
    return this.curso && typeof this.curso.Requisitos === 'string' 
      ? this.curso.Requisitos.split('.') 
      : [];
  }

 

}