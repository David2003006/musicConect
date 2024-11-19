import { Injectable } from '@angular/core';
import { Carrito } from 'src/app/Models/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Carrito[] = [];

  constructor() {
    this.cargarCarrito();
  }

  // Cargar el carrito desde localStorage
  private cargarCarrito() {
    const productos = localStorage.getItem('productosEnCarrito');
    this.carrito = productos ? JSON.parse(productos) : [];
  }

  // Guardar el carrito en localStorage
  private guardarCarrito() {
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.carrito));
  }

  // Obtener los productos del carrito
  getProductosCarrito() {
    return [...this.carrito];
  }

  // Agregar un producto al carrito
  agregarProducto(producto: Carrito) {
    const productoExistente = this.carrito.find(p => p.idProducto === producto.idProducto);
    if (!productoExistente) {
      this.carrito.push(producto);
      this.guardarCarrito();
    }
  }

  // Eliminar un producto del carrito
  eliminarProducto(idProducto: string) {
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto);
    this.guardarCarrito();
  }

  // Calcular el total del carrito
  calcularTotal() {
    return this.carrito.reduce((total, producto) => total + producto.Total, 0);
  }
}

