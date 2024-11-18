import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCol, IonCard, IonCardContent, IonRow, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { cart } from 'ionicons/icons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    IonInput,
    IonSelect, IonSelectOption,
    IonCol, IonRow,
    IonCard, IonCardContent,
    IonIcon,
    CarritoComponent,
    IonPopover,
    CommonModule
  ]
})
export class CompraPage implements OnInit {

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

  irDetalleCompra(id: string) {

    this.navCtrl.navigateForward("compra/" + id, { animated: false });

  }

}
