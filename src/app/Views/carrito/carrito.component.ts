import { Component, OnInit } from '@angular/core';
import { IonPopover, IonList, IonItem } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { CarritoService } from 'src/app/Services/carrito.service';
import { Carrito } from 'src/app/Models/Interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [
    IonPopover,
    IonList, IonItem,
    CommonModule
  ],
})
export class CarritoComponent implements OnInit {
  productosCarrito: Carrito[] = [];
  totalCarrito: number = 0;

  //Se agego la funcionalida del icono del carrito
  constructor(private navCtrl: NavController, private carritoService: CarritoService) {}

  ngOnInit() {
    // Cargar los productos del carrito al inicializar el componente
    this.cargarCarrito();
  }

  // Método para navegar a la vista de lista de carrito
  irListaCarrito() {
    this.navCtrl.navigateForward('lista-carrito', { animated: false });
  }

  // Método para cargar los productos del carrito y calcular el total
  cargarCarrito() {
    this.productosCarrito = this.carritoService.getProductosCarrito();
    this.calcularTotal();
  }

  // Método para calcular el total del carrito
  calcularTotal() {
    this.totalCarrito = this.carritoService.calcularTotal();
  }
}
