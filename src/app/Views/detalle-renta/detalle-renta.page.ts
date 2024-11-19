import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { Producto } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-renta',
  templateUrl: './detalle-renta.page.html',
  styleUrls: ['./detalle-renta.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    FormsModule    
  ]
})
export class DetalleRentaPage implements OnInit {

  @Input() productoId!: string; // Recibe el ID del producto
  producto?: Producto;
  cantidad: number = 0;
  tipoRenta: string = "";
  renta: boolean = true;
  plazo: number = 0;
  esRenta: boolean = true;

  constructor(private fireStoreServices: FirestoreDatabaseService, 
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // 'id' debe coincidir con el nombre en la ruta
    console.log("el id de la guitarra es:"+ id)
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
      if (this.esRenta) {
        queryParams.plazo = this.plazo;
        queryParams.tipo = this.tipoRenta;
        queryParams.renta = this.renta;
        queryParams.cantidad = this.plazo
      }
      console.log('Parámetros enviados al carrito:', queryParams)
      // Redirigir al carrito con los parámetros configurados
      this.navCtrl.navigateForward(`/lista-carrito`, {
        queryParams: queryParams
      });
  
  
}
}
}
