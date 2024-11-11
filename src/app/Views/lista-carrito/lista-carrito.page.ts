import { Component, OnInit } from '@angular/core';
import { IonContent, IonList, IonItem, IonIcon, IonButton, IonListHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.services';
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
      const nombreProducto = params['nombreProducto'];
      const precio = params['precio'];
      const cantidad = params['cantidad'];
      
      // Si se recibe `idProducto`, agregar al carrito
      if (idProducto) {
        const producto: Producto = {
          CategoriaID: '', // o el valor real si está disponible
          Nombre: nombreProducto,
          Precio: +precio,
          ProductoID: idProducto,
          descripcion: '', // Descripción del producto o texto predeterminado si no está disponible
          Compra: false,   // Asigna `true` o `false` según corresponda en tu lógica
          cantidad: +cantidad,
          RentaID: '',     // ID de renta, o valor vacío si no es aplicable
          imagen: ''       // URL de la imagen o cadena vacía si no tienes este dato
        };
        this.agregarAlCarrito(producto, cantidad);
      }
    });
  
    // Cargar los productos del carrito desde el servicio
    this.productosEnCarrito = this.carritoService.getProductosCarrito();
    
    // Actualizar el total después de cargar los productos
    this.totalCarrito = this.carritoService.calcularTotal();
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
    if (producto) {
      const productoCarrito: Carrito = {
        idProducto: producto.ProductoID,
        Nombre: producto.Nombre,
        Precio: producto.Precio,
        Tipo: 'Compra', // O `tipoRenta` si es de renta
        Total: producto.Precio * cantidad,
        imagen: producto.imagen // Verifica si tienes este campo en `Producto`
      };
  
      // Agregar el producto al carrito usando el servicio
      this.carritoService.agregarProducto(productoCarrito);
  
      // Actualizar la lista de productos en la vista
      this.productosEnCarrito = this.carritoService.getProductosCarrito();
      
      // Actualizar el total
      this.totalCarrito = this.carritoService.calcularTotal();
    }
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
