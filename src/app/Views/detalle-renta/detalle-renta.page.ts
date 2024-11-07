import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { Producto } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.services';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-renta',
  templateUrl: './detalle-renta.page.html',
  styleUrls: ['./detalle-renta.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,    
  ]
})
export class DetalleRentaPage implements OnInit {

  @Input() productoId!: string; // Recibe el ID del producto
  producto?: Producto;
  tipoRenta: string = "";
  plazo: number = 0;

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

  agregarAlCarrito(){
    const tipoRentaSeleccionado = (document.querySelector('#tipoRenta select') as HTMLSelectElement).value;
    const plazoIngresado = parseInt((document.querySelector('#plazo input') as HTMLInputElement).value, 10);
  
    // Validación para asegurar que los datos sean válidos
    if (!plazoIngresado || plazoIngresado <= 0) {
      alert('Por favor ingrese un plazo válido.');
      return;
  }

  this.navCtrl.navigateForward(`/lista-carrito`, {
    queryParams: {
      idProducto: this.producto?.ProductoID,
      tipoRenta: tipoRentaSeleccionado,
      plazo: plazoIngresado
    }
  });
    //console.log(this.producto?.ProductoID)
    //console.log(tipoRentaSeleccionado)
    //console.log(plazoIngresado)
  }
}
