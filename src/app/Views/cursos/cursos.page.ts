import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { addCircleOutline, cart } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';
import { Curso } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { FiltrosService } from 'src/app/Services/filtros.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    //IonicModule ,
    HeaderComponent,
    IonInput,
    IonSelect, 
    IonSelectOption,
    IonCard,
    IonIcon,
    CarritoComponent,
    IonPopover,
    FormsModule
  ]
})
export class CursosPage implements OnInit {

  cursos: Curso[] = [];
  cursosEnCarrito: any [] = [];
  estadoCarrito: boolean = false;
  CursosFiltrados: Curso[] = [];
  busqueda: string = '';
  categoriaSeleccionado: string = 'Todos';
  categoriaIdSeleccionado: string | undefined = undefined;
  
  constructor(private eRef: ElementRef, private navCtrl: NavController,
               private fire: FirestoreDatabaseService, 
               private filtrosService: FiltrosService) {

    addIcons({ addCircleOutline, cart });

   }

  ngOnInit() {
    this.cargarCursos();
    this.cursosEnCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  }


 // cargarCursos() {
   //Aquí puedes agregar tu lógica para obtener los cursos desde Firestore u otro servicio
    //this.fire.getCollectionChanges<Curso>('Curso').subscribe(cursos => {
     // console.log('Cursos recibidos:', cursos);
     //this.cursos = cursos;
     //console.log('Cursos recibidos:', cursos);
    //});
  //}
   //
   cargarCursos() {
    this.fire.getCollectionChanges<Curso>('Curso').subscribe((cursosActualizados) => {
      this.cursos = cursosActualizados;
      console.log("Cursos obtenidos:", this.cursos);
      this.filtrarProductos(); 
    });
  }


  obtenerIdsFiltros() {
    //console.log("Categoria seleccionada: ", this.categoriaSeleccionado);

    // Si la categoría no es "Todos", obtenemos el ID de la categoría
    if (this.categoriaSeleccionado !== 'Todos') {
      this.filtrosService.getCategoriaIdByName(this.categoriaSeleccionado).subscribe(id => {
        this.categoriaIdSeleccionado = id;
        console.log("Categoria seleccionada: ", this.categoriaSeleccionado);
        console.log("ID de la categoría seleccionada: ", this.categoriaIdSeleccionado);
        this.filtrarProductos(); // Filtrar productos según la categoría seleccionada
      });
    } else {
      this.categoriaSeleccionado = "Todos"; // Si es "Todos", mostramos todos los productos
      this.cargarCursos(); // Cargar todos los productos
    }
  }
  // Funcion para dar los cursos con os filtros
  filtrarProductos(){
    if (this.categoriaIdSeleccionado) {
      this.cursos = this.cursos.filter(curso => curso.CategoriaID === this.categoriaIdSeleccionado);
    }

    if (this.busqueda.trim() !== '') {
      // Filtrar por el texto de búsqueda (en este caso por el nombre del producto)
      this.cursos = this.cursos.filter(curso => 
        curso.Nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }

  }


  cambiarEstadoCarrito() {
    this.estadoCarrito = !this.estadoCarrito;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {

    if (!this.eRef.nativeElement.contains(event.target)) {

      this.estadoCarrito = false;

    }

  }

  getPrecioFormateado(precio: string): string {
    return parseFloat(precio).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  irDetalleCurso(id: string) {

    this.navCtrl.navigateForward("curso/DetalleCurso/" + id, { animated: false });

  }

  
}