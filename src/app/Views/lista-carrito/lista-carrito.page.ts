import { Component, OnInit } from '@angular/core';
import { IonContent, IonList, IonItem, IonIcon, IonButton, IonListHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { contractOutline, enter, trash } from 'ionicons/icons';
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
      let cantidad = +params['cantidad'];
      const plazo = params['plazo'];
      const tipo = params['tipo'];
      const renta: boolean = params['renta'] === 'true';  // Convierte a booleano

      if (cantidad <= 0 || isNaN(cantidad)) {
        cantidad  = 1;  // Asigna 1 si la cantidad es 0 o no es un número válido
      }
  
      console.log("idProducto", idProducto, "la cantidad", cantidad, "el plazo", plazo, "el tipo", tipo, "renta", renta);

      if (idProducto) {
        // Obtener el producto desde Firebase
        console.log("entre");
        this.fire.getDocumentChanges<Producto>(`Producto/${idProducto}`).subscribe((producto) => {
          if (producto != null) {
            // Verificar si el producto es una compra o una renta
            console.log("Si lo encontre");
            if (renta) {
              this.agregarAlCarrito(producto, cantidad, plazo, tipo, renta);  // Pasar 'renta' como argumento
            } else {
              console.log("No vino de renta");
              this.agregarAlCarrito(producto, cantidad, plazo, tipo, renta);  // Pasar 'renta' como argumento
            }
          } else {
            console.log("No lo encontre");
          }
        });
      }
    });
  
    // Cargar los productos del carrito desde el servicio
    this.cargarProductos();
  }

  cargarProductos() {
    // Cargar productos y actualizar el total desde el servicio
    this.productosEnCarrito = this.carritoService.getProductosCarrito();
    this.totalCarrito = this.carritoService.calcularTotal();
  }

  agregarAlCarrito(producto: Producto, cantidad: number = 1, plazo?: string, tipo?: string, renta?: boolean) {
    // Si es renta, el precio total podría ser diferente o estar vacío
    const precioProducto = producto.Precio > 0 ? producto.Precio : 0;

    console.log("Este es el precio", precioProducto, "Esta es la cantidad", cantidad)

    // Crear el objeto del producto para el carrito
    const productoCarrito: Carrito = {
      idProducto: producto.ProductoID,
      Nombre: producto.Nombre,
      Precio: precioProducto, // Asigna el precio verificado
      Tipo: renta ? 'Renta' : (producto.Compra ? 'Compra' : tipo || 'Compra'), // Si es renta, marcar como 'Renta'
      Total: precioProducto * cantidad, // Calcula el total con el precio validado
      imagen: producto.imagen,
      Plazo: renta ? (plazo || '') : '', // Solo asignar plazo si es renta
    };

    console.log("esto se va a agregar al carrito", productoCarrito)
    // Agregar el producto al carrito usando el servicio
    this.carritoService.agregarProducto(productoCarrito);
    this.cargarProductos();  // Recargar productos y actualizar el total
  }

  eliminarProducto(idProducto: string) {
    // Eliminar el producto del carrito usando el servicio
    this.carritoService.eliminarProducto(idProducto);
    this.cargarProductos();  // Recargar productos y actualizar el total
  }
}
