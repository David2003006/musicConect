import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { Producto } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renta',
  templateUrl: './renta.page.html',
  styleUrls: ['./renta.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
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
export class RentaPage implements OnInit {
  productos: Producto[] = []
  categorias: any[] = []; // Cambia 'any' al tipo adecuado
  productosFiltrados: Producto[] = []; 
  categoriaSeleccionada: string = 'Todos';
  tipoRenta: any[] = []
  tiporentaSeleccionada: string = 'Todos';
  nombreBusqueda: string = '';

  constructor(private eRef: ElementRef, private fireStoreServices: FirestoreDatabaseService) { 

    addIcons({ cart });

  }

  ngOnInit() {
    this.obtenerProductos()

    this.fireStoreServices.getCollectionChanges<any>('Categoria').subscribe((data) =>{
      this.categorias = data;
    });

    this.fireStoreServices.getCollectionChanges<any>('TipoRenta').subscribe((data) =>{
      this.tipoRenta = data;
    });
  }

  obtenerProductos() {
    this.fireStoreServices.getCollectionChanges<Producto>('Producto').subscribe((data) => {
      this.productos = data;
    });
  }

  estadoCarrito = false;

  buscarPorNombre() {
    const nombre = this.nombreBusqueda.toLowerCase().trim();

    // Filtrar productos por el nombre ingresado
    this.productosFiltrados = this.productos.filter(producto =>
      producto.Nombre.toLowerCase().includes(nombre)
    );
  
    // Mostrar alerta si no se encuentran productos
    if (this.productosFiltrados.length === 0) {
      alert('No se encontró el objeto para rentar');
      this.nombreBusqueda = ''; // Reiniciar el input de búsqueda
    }
  }

  filtrarPorCategoria()
  {
    if (this.categoriaSeleccionada === 'Todos') {
      this.obtenerProductos();
    } else {
      // Filtrar los productos según la categoría seleccionada
      this.fireStoreServices.getCollectionChanges<Producto>('Producto').subscribe((data) => {
        this.productos = data.filter(producto => producto.CategoriaID === this.categoriaSeleccionada);
      });
    }
  
}

filtrarPorRenta()
{
  if (this.categoriaSeleccionada === 'Todos') {
    this.obtenerProductos();
  } else {
    // Filtrar los productos según la categoría seleccionada
    this.fireStoreServices.getCollectionChanges<Producto>('Producto').subscribe((data) => {
      this.productos = data.filter(producto => producto.RentaID === this.tiporentaSeleccionada);
    });
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

}
