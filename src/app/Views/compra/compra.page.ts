import { Component, OnInit, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.services';
import { Categoria, Producto } from 'src/app/Models/Interfaces';
import { map, mergeMap, Observable, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FiltrosService } from 'src/app/Services/filtros.service';

@Component({
  selector: 'app-renta',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    //IonicModule,
    HeaderComponent,
    IonInput,
    IonSelect, IonSelectOption,
    IonCard,
    IonIcon,
    CarritoComponent,
    IonPopover, 
    CommonModule,
    FormsModule
  ]
})
export class CompraPage implements OnInit {
  productos: Producto[] = [];
  productosEnCarrito: any [] = [];
  categoriaSeleccionada: string = 'Todos'; // Asegúrate de que esta variable esté definida
  categoriaIdSeleccionada: string | undefined = undefined; 
  textoBusqueda: string = '';

  constructor(private eRef: ElementRef, private navCtrl: NavController, 
    private fire: FirestoreDatabaseService, private filtrosService: FiltrosService) { 
    addIcons({ cart });
  }

  ngOnInit() {
    this.obtenerProductos();
    this.productosEnCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  obtenerProductos() {
    this.fire.getCollectionChanges<Producto>('Producto').pipe(
      map((productos) => 
        productos.filter(producto => producto.Compra === true) // Filtrar productos donde Compra es true
      )
    ).subscribe((productosActualizados) => {
      this.productos = productosActualizados;
      console.log("Productos obtenidos:", this.productos);
      this.filtrarProductos(); 
    });
  }

  obtenerIdsFiltros() {
    console.log("Categoria seleccionada: ", this.categoriaSeleccionada);

    // Si la categoría no es "Todos", obtenemos el ID de la categoría
    if (this.categoriaSeleccionada !== 'Todos') {
      this.filtrosService.getCategoriaIdByName(this.categoriaSeleccionada).subscribe(id => {
        this.categoriaIdSeleccionada = id;
        console.log("ID de la categoría seleccionada: ", this.categoriaIdSeleccionada);
        this.filtrarProductos(); // Filtrar productos según la categoría seleccionada
      });
    } else {
      this.categoriaIdSeleccionada = "Todos"; // Si es "Todos", mostramos todos los productos
      this.obtenerProductos(); // Cargar todos los productos
    }
  }

  // Función para filtrar los productos según la categoría seleccionada
  filtrarProductos() {
    if (this.categoriaIdSeleccionada) {
      this.productos = this.productos.filter(producto => producto.CategoriaID === this.categoriaIdSeleccionada);
    }

    if (this.textoBusqueda.trim() !== '') {
      // Filtrar por el texto de búsqueda (en este caso por el nombre del producto)
      this.productos = this.productos.filter(producto => 
        producto.Nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase())
      );
    }

  }


  idProducto: string = "EsteEsElIDDelProducto";
  estadoCarrito = false;

  cambiarEstadoCarrito() {
    this.estadoCarrito = !this.estadoCarrito;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.estadoCarrito = false;
    }
  }

  irDetalleCompra(id: string) {
    this.navCtrl.navigateForward("compra/" + id, { animated: false });
  }
}