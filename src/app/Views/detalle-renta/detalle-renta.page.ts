import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { Producto } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.services';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private fireStoreServices: FirestoreDatabaseService, 
    private route: ActivatedRoute
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
      console.log(producto)
      this.producto = producto;
    });
  }

}
