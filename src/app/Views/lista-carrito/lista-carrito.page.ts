import { Component, OnInit } from '@angular/core';
import { IonContent, IonList, IonItem, IonIcon, IonButton, IonListHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { CarritoCompra, Curso, MetodoPago, Producto } from 'src/app/Models/Interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { ListaCarritoServicesService } from 'src/app/Services/lista-carrito.services.service';

@Component({
  selector: 'app-lista-carrito',
  templateUrl: './lista-carrito.page.html',
  styleUrls: ['./lista-carrito.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    IonList,
    IonListHeader,
    IonItem,
    IonIcon,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class ListaCarritoPage implements OnInit {
  totalCarrito: number = 0;
  carrito: CarritoCompra[] = [];  // Lista del carrito
  detallesItems$: Observable<any[]> = of([]);

  productos: Producto[] = []; // Lista de productos disponibles
  cursos: Curso[] = [];       // Lista de cursos disponibles
  metodosPago: MetodoPago[] = []; // Lista de métodos de pago disponibles

  constructor(private navCtrl: NavController, private carritoService: ListaCarritoServicesService) { 
    addIcons({ trash });
  }

  ngOnInit() {
    this.cargarCarrito(); // Carga el carrito al inicializar
    this.actualizarTotal(); // Inicializa el total del carrito
  }

  cargarCarrito() {
    this.carritoService.cargarCarrito().subscribe(carritoItems => {
      this.carrito = carritoItems; // Asigna el carrito desde el servicio
      this.carritoService.setCarrito(carritoItems); // Establece el carrito en el servicio
      this.actualizarTotal(); // Actualiza el total después de cargar los elementos
    });
  }

  actualizarTotal() {
    this.carritoService.actualizarTotal().subscribe(total => {
      this.totalCarrito = total; // Actualiza el total del carrito
    });
  }

  agregarProductoAlCarrito(carritoItem: CarritoCompra) {
    this.carrito.push(carritoItem);
    this.carritoService.setCarrito(this.carrito); // Actualiza el carrito en el servicio
    this.actualizarTotal(); // Actualiza el total después de agregar un producto
  }

  eliminarProducto(carritoItem: CarritoCompra) {
    const index = this.carrito.indexOf(carritoItem);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.carritoService.setCarrito(this.carrito); // Actualiza el carrito en el servicio
      this.actualizarTotal(); // Actualiza el total después de eliminar un producto
    }
  }

  comprarCarrito() {
    this.irRuta('compra');
  }

  irRuta(ruta: string) {
    this.navCtrl.navigateForward(ruta, { animated: false });
  }
}
