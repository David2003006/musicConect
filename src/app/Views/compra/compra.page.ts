
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { Producto } from 'src/app/Models/Interfaces';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renta',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    //IonicModule,
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
export class CompraPage implements OnInit {
  productos: Producto[] = [];
  productosEnCarrito: any [] = [];

  constructor(private eRef: ElementRef, private navCtrl: NavController, private fire: FirestoreDatabaseService) { 
    addIcons({ cart });
  }

  ngOnInit() {
    this.obtenerProductos();
    this.productosEnCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  obtenerProductos() {
    this.fire.getCollectionChanges<Producto>('Producto').pipe(
      map((productos) => 
        productos.filter(producto => producto.Compra === true) // Filtrar productos donde Compra es true
      )
    ).subscribe((productosActualizados) => {
      this.productos = productosActualizados;
    });
  }

  //idProducto: string = "EsteEsElIDDelProducto";
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

  irDetalleCompra(id: string) {
    this.navCtrl.navigateForward("compra/" + id, { animated: false });
  }
}