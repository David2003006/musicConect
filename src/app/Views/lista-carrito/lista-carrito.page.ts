import { Component, OnInit } from '@angular/core';
import { IonContent, IonList, IonItem, IonIcon, IonButton, IonListHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { Carrito, Producto } from 'src/app/Models/Interfaces';
import { CarritoService } from 'src/app/Services/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-carrito',
  templateUrl: './lista-carrito.page.html',
  styleUrls: ['./lista-carrito.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    CommonModule,
    IonList, IonListHeader, IonItem,
    IonIcon,
    IonButton
  ]
})
export class ListaCarritoPage implements OnInit {
  productosEnCarrito: Carrito[] = [];
  totalCarrito: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fire: FirestoreDatabaseService,
    private carritoService: CarritoService
  ) {
    addIcons({ trash });
  }

  ngOnInit() {
    // Suscripción a los parámetros de la ruta para agregar productos al carrito
    this.route.queryParams.subscribe(params => {
      const idProducto = params['idProducto'];
      const tipoRenta = params['tipoRenta'];
      const plazo = params['plazo'];
      if (idProducto && tipoRenta && plazo) {
        this.agregarAlCarrito(idProducto, tipoRenta, plazo);
      }
    });
    // Cargar los productos del carrito desde el servicio
    this.productosEnCarrito = this.carritoService.getProductosCarrito();
    
    // Actualizar el total después de cargar los productos
    this.totalCarrito = this.carritoService.calcularTotal();
  }

  agregarAlCarrito(idProducto: string, tipoRenta: string, plazo: number) {
    this.fire.getDoc<Producto>('Producto', idProducto).subscribe(producto => {
      if (producto) {
        const productoCarrito: Carrito = {
          idProducto: producto.ProductoID,
          Nombre: producto.Nombre,
          Precio: producto.Precio,
          Tipo: tipoRenta,
          Total: producto.Precio * plazo,
          imagen: producto.imagen
        };
        // Agregar el producto al carrito utilizando el servicio
        this.carritoService.agregarProducto(productoCarrito);
        // Actualizar la lista de productos en la vista
        this.productosEnCarrito = this.carritoService.getProductosCarrito();
        
        // Actualizar el total
        this.totalCarrito = this.carritoService.calcularTotal();
      } else {
        console.error('Producto no encontrado');
      }
    });
  }
  eliminarProducto(idProducto: string) {
    // Eliminar el producto del carrito usando el servicio
    this.carritoService.eliminarProducto(idProducto);
    
    // Actualizar la lista de productos en la vista
    this.productosEnCarrito = this.carritoService.getProductosCarrito();
    
    // Actualizar el total
    this.totalCarrito = this.carritoService.calcularTotal();
  }
}