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
  plazo: number = 0;
  tipo: string = '';
  producto?: Producto;
  cantidad: number = 0;
  esRenta: boolean = false ;

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
      const queryParams: any = {
        idProducto: this.producto.ProductoID,
        cantidad: this.cantidad
      };
  
      // Verificar si es un producto de renta y agregar parámetros adicionales
      if (this.esRenta) {
        queryParams.plazo = this.plazo;
        queryParams.tipo = this.tipo;
      }

      console.log('Parámetros enviados al carrito:', queryParams);
      // Redirigir al carrito con los parámetros configurados
      this.navCtrl.navigateForward(`/lista-carrito`, {
        queryParams: queryParams
      });
    }
  }
}