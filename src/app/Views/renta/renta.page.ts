import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { Producto, Renta } from 'src/app/Models/Interfaces';
import { collection, getDocs } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FiltrosService } from 'src/app/Services/filtros.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-renta',
  templateUrl: './renta.page.html',
  styleUrls: ['./renta.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    //IonicModule,
    HeaderComponent,
    IonInput,
    IonSelect, 
    IonSelectOption,
    IonCard,
    IonIcon,
    CarritoComponent,
    IonPopover, 
    CommonModule,
    FormsModule
  ]
})

export class RentaPage implements OnInit {

  productos: Producto[] = [];  // Lista de productos originales
  productosFiltrados: Producto[] = []; // Lista de productos filtrados
  busqueda: string = '';  // Filtro de búsqueda
  categoriaSeleccionada: string = 'Todos'; // Filtro de categoría
  tipoRentaSeleccionado: string = 'Todos'; // Filtro de tipo renta

  categoriaIdSeleccionada: string | undefined = undefined; // ID de categoría seleccionada
  tipoRentaIdSeleccionado: string | undefined = undefined; // ID de tipo renta seleccionado

  

  constructor(
    private filtrosService: FiltrosService,
    private fire: FirestoreDatabaseService,
    private eRef: ElementRef, 
    private  navCtrl: NavController) {}

  ngOnInit() {
    // Obtener los productos
    this.obtenerProductos();
    // Obtener los ids de las categorías y tipos de renta al inicio
    this.obtenerIdsFiltros()
  }

  obtenerIdsFiltros() {
    console.log("Tipo renta seleccionado:", this.tipoRentaSeleccionado);
  
    // Obtener el id de la categoría seleccionada
    if (this.categoriaSeleccionada !== 'Todos') {
      this.filtrosService.getCategoriaIdByName(this.categoriaSeleccionada).subscribe(id => {
        this.categoriaIdSeleccionada = id;
        this.filtrarProductos(); // Volver a filtrar con el nuevo id de categoría
      });
    }
  
    // Obtener el id del tipo de renta seleccionado
    if (this.tipoRentaSeleccionado !== 'Todos') {
      if(this.tipoRentaSeleccionado === 'Semanal'){
        this.tipoRentaIdSeleccionado = 'S'
        this.filtrarProductos()
      }else{
        if(this.tipoRentaSeleccionado === 'Mensual'){
          this.tipoRentaIdSeleccionado = 'M'
          this.filtrarProductos()
        }else{
          this.tipoRentaIdSeleccionado = 'A'
          this.filtrarProductos()
        }
      }
    }
  }
  
  obtenerProductos() {
    console.log("Obteniendo productos desde la base de datos...");
    this.fire.getCollectionChanges<Producto>('Producto').subscribe((productos: Producto[]) => {
      this.productos = productos;
      this.filtrarProductos(); // Llamar a filtrarProductos para mostrar todos los productos
    }, error => {
      console.error("Error al obtener productos:", error);
    });
  }
  

  idProducto: string = "EsteEsElIDDelProducto";
  // Función para filtrar los productos
  filtrarProductos() {
    this.productosFiltrados = this.productos.filter((producto) => {
      let cumpleCategoria = true;
      let cumpleTipoRenta = true;
      let cumpleBusqueda = true;

      // Filtrar por categoría (por id)
      if (this.categoriaIdSeleccionada && this.categoriaIdSeleccionada !== 'Todos') {
        cumpleCategoria = producto.CategoriaID === this.categoriaIdSeleccionada;
      }

      // Filtrar por tipo renta (por id)
      if (this.tipoRentaIdSeleccionado && this.tipoRentaIdSeleccionado !== 'Todos') {
        cumpleTipoRenta = producto.RentaID === this.tipoRentaIdSeleccionado;
      }

      // Filtrar por búsqueda
      if (this.busqueda) {
        cumpleBusqueda = producto.Nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      }

      return cumpleCategoria && cumpleTipoRenta && cumpleBusqueda;
    });
  }

  estadoCarrito = false;

  cambiarEstadoCarrito() {
    this.estadoCarrito = !this.estadoCarrito;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {

      this.estadoCarrito = false;

      this.estadoCarrito = false;
    }
  }


  irDetalleRenta(id: string) {
    this.navCtrl.navigateForward("renta/" + id, { animated: false });
  }
}
