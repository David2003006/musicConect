import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { Producto } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    CommonModule,
    FormsModule  
  ]
})
export class DetalleCompraPage implements OnInit {
  @Input() productoId!: string; // Recibe el ID del producto
  producto?: Producto;
  cantidad: number = 0;

  constructor(
    private fireStoreServices: FirestoreDatabaseService, 
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // 'id' debe coincidir con el nombre en la ruta
    console.log("El ID del producto es: " + id);
    if (id) {
      this.obtenerProducto(id);
    }
  }

  obtenerProducto(id: string) {
    this.fireStoreServices.getDoc<Producto>('Producto', id).subscribe((producto) => {
      this.producto = producto;
    });
  }

  agregarAlCarrito() {
    if (this.producto) {
      this.navCtrl.navigateForward(`/lista-carrito`, {
        queryParams: {
          idProducto: this.producto.ProductoID,
          nombreProducto: this.producto.Nombre,
          precio: this.producto.Precio,
          cantidad : this.cantidad
        }
      });
    }
  }
}