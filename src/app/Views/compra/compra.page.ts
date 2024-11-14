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

  categoriaSeleccionada: string = 'Todos';
  busqueda: string = '';
  categorias: { [id: string]: string } = {};  // Mapeo de CategoriaID a Nombre
  productosFiltrados: Producto[] = [];

  constructor(private eRef: ElementRef, private navCtrl: NavController,
     private fire: FirestoreDatabaseService,
     private cdRef: ChangeDetectorRef) { 
    addIcons({ cart });
  }

  ngOnInit() {
    this.obtenerCategorias();
    this.productosEnCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  obtenerCategorias() {
    this.fire.getCollectionChanges<Categoria>('Categoria').pipe(
      map((categoriaList) => {
        categoriaList.forEach((categoria) => {
          this.categorias[categoria.CategoriaID] = categoria.Nombre; // Asegúrate de que CategoriaID es correcto
        });
      }),
      switchMap(() => this.obtenerProductos()) // Llamada a obtenerProductos que retorna un Observable
    ).subscribe((productosActualizados) => {
      this.productos = productosActualizados;
      this.filtrarProductos(); // Aplicamos el filtro después de obtener los productos
    });
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.fire.getCollectionChanges<Producto>('Producto').pipe(
      map((productos) => 
        productos.filter(producto => producto.Compra === true) // Filtrar productos donde Compra es true
      )
    );
  }

  filtrarProductos() {
    console.log("Categoría seleccionada:", this.categoriaSeleccionada);
    console.log("Lista de categorías:", this.categorias);
    
    this.productosFiltrados = this.productos;

    // Obtener el ID de la categoría seleccionada usando su nombre
    const categoriaIDSeleccionada = Object.entries(this.categorias).find(
      ([id, nombre]) => nombre === this.categoriaSeleccionada
    )?.[0]; // Esto obtiene el ID de la categoría seleccionada si existe

    // Filtrar por Categoría si se ha seleccionado una y el ID es válido
    if (this.categoriaSeleccionada !== 'Todos' && categoriaIDSeleccionada) {
        this.productosFiltrados = this.productosFiltrados.filter(
            producto => producto.CategoriaID === categoriaIDSeleccionada
        );
    }

    // Filtrar por Búsqueda
    if (this.busqueda) {
        this.productosFiltrados = this.productosFiltrados.filter(producto => 
            producto.Nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        );
    }

    console.log("Productos después de filtrar:", this.productosFiltrados);
}
  

  //idProducto: string = "EsteEsElIDDelProducto";
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