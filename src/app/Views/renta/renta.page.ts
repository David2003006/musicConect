import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';

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
    IonPopover
  ]
})
export class RentaPage implements OnInit {

  constructor(private eRef: ElementRef, private navCtrl: NavController) { 

    addIcons({ cart });

  }

  ngOnInit() {
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
