import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { Producto, Renta } from 'src/app/Models/Interfaces';
import { collection, getDocs } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renta',
  templateUrl: './renta.page.html',
  styleUrls: ['./renta.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
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
export class RentaPage implements OnInit {
    productos : Producto[] = []

  constructor(private eRef: ElementRef, private navCtrl: NavController, private fire: FirestoreDatabaseService) { 

    addIcons({ cart });

  }

  ngOnInit() {
    this.obtenerProductos();
  }
  obtenerProductos() {
    this.fire.getCollectionChanges<Renta>('TipoRenta').pipe(
      // Mapeamos los resultados de TipoRenta a un diccionario que asocia cada ID con su símbolo
      map((tipoRentaList) => {
        const tipoRentaMap = new Map<string, string>();
        tipoRentaList.forEach((tipoRenta) => {
          if (tipoRenta.Nombre === 'Semanal') {
            tipoRentaMap.set(tipoRenta.RentaID, 'S');
          } else if (tipoRenta.Nombre === 'Anual') {
            tipoRentaMap.set(tipoRenta.RentaID, 'A');
          } else if (tipoRenta.Nombre === 'Mensual') {
            tipoRentaMap.set(tipoRenta.RentaID, 'M');
          }
        });
        return tipoRentaMap;
      }),
      // Luego, obtenemos los productos y actualizamos la propiedad RentaID
      switchMap((tipoRentaMap) => 
        this.fire.getCollectionChanges<Producto>('Producto').pipe(
          map((productos) => 
            productos.map((producto) => {
              const rentaSimbolo = tipoRentaMap.get(producto.RentaID);
              return {
                ...producto,
                RentaID: rentaSimbolo ? rentaSimbolo : producto.RentaID // Asigna símbolo o mantiene el ID original si no existe en el map
              };
            })
          )
        )
      )
    ).subscribe((productosActualizados) => {
      this.productos = productosActualizados;
    });
  }

  idProducto: string = "EsteEsElIDDelProducto";

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

  irDetalleRenta(id: string) {

    this.navCtrl.navigateForward("renta/" + id, { animated: false });
  }

}
