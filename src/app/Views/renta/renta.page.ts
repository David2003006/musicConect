import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.services';
import { Categoria, Producto, Renta } from 'src/app/Models/Interfaces';
import { collection, getDocs } from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
  productos: Producto[] = [];
  categoriaSeleccionada = 'Todos';
  tipoRentaSeleccionado = 'Todos';
  busquedaTermino = ''; // Para almacenar el término de búsqueda
  categorias: { [id: string]: string } = {}; // Mapeo de CategoriaID a Nombre
  productosFiltrados: Producto[] = [];

  constructor(private eRef: ElementRef, private navCtrl: NavController, 
    private fire: FirestoreDatabaseService,
    private cdRef: ChangeDetectorRef) {
    addIcons({ cart });
  }

  ngOnInit() {
    this.obtenerCategorias();
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
    return this.fire.getCollectionChanges<Renta>('TipoRenta').pipe(
      map((tipoRentaList) => {
        const tipoRentaMap = new Map<string, string>();
        tipoRentaList.forEach((tipoRenta) => {
          if (tipoRenta.Nombre === 'Semanal') {
            tipoRentaMap.set(tipoRenta.RentaID, 'S');
          } else if (tipoRenta.Nombre === 'Anual') {
            tipoRentaMap.set(tipoRenta.RentaID, 'A');
          } else if (tipoRenta.Nombre === 'Mensual') {
            tipoRentaMap.set(tipoRenta.RentaID, 'M');
          }
        });
        return tipoRentaMap;
      }),
      switchMap((tipoRentaMap) =>
        this.fire.getCollectionChanges<Producto>('Producto').pipe(
          map((productos) =>
            productos.map((producto) => {
              const rentaSimbolo = tipoRentaMap.get(producto.RentaID);
              return {
                ...producto,
                RentaID: rentaSimbolo ? rentaSimbolo : producto.RentaID,
              };
            })
          )
        )
      )
    );
  }

  filtrarProductos() {
    console.log("Categoría seleccionada:", this.categoriaSeleccionada);
    console.log("Lista de categorías:", this.categorias);
    
    // Inicializamos los productos filtrados con todos los productos
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
    if (this.busquedaTermino) {
      this.productosFiltrados = this.productosFiltrados.filter(producto => 
        producto.Nombre.toLowerCase().includes(this.busquedaTermino.toLowerCase())
      );
    }
  
    // Filtrar por Tipo de Renta
    if (this.tipoRentaSeleccionado !== 'Todos') {
      this.productosFiltrados = this.productosFiltrados.filter(
        producto => producto.RentaID === this.tipoRentaSeleccionado
      );
    }
  
    console.log("Productos después de filtrar:", this.productosFiltrados);
    
    this.cdRef.markForCheck(); // Forza la detección de cambios en la vista
  }

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

  irDetalleRenta(id: string) {
    this.navCtrl.navigateForward("renta/" + id, { animated: false });
  }
}