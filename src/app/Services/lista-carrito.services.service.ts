import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of } from 'rxjs';
import { CarritoCompra } from '../Models/Interfaces';
import { FirestoreDatabaseService } from './firestore-database.service';

@Injectable({
  providedIn: 'root'
})
export class ListaCarritoServicesService {
  private carrito: CarritoCompra[] = [];  // Lista del carrito
  private carritoSubject = new BehaviorSubject<CarritoCompra[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor(private fire: FirestoreDatabaseService) {}

  cargarCarrito(): Observable<CarritoCompra[]> {
    return this.fire.getCollectionChanges<CarritoCompra>('CarritoCompra').pipe(
      catchError(error => {
        console.error('Error al cargar el carrito:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  obtenerDetallesItem(item: CarritoCompra): Observable<any> {
    let detalles$: Observable<any>;

    // Consultar según el ID del producto
    if (item.ProductoID) {
      detalles$ = this.fire.getDoc<any>('Producto', item.ProductoID).pipe(
        map(detalles => ({
          imagen: detalles?.imagen || 'https://ionicframework.com/docs/img/demos/avatar.svg',
          precio: detalles?.Precio || 0,
          nombre: detalles?.Nombre || 'Nombre Producto',
          tipo: 'Producto'
        })),
        catchError(error => {
          console.error('Error al obtener el producto:', error);
          return of({
            imagen: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            precio: 0,
            nombre: 'Nombre Producto',
            tipo: 'Producto'
          });
        })
      );
    } 
    // Consultar según el ID del curso
    else if (item.CursoID) {
      detalles$ = this.fire.getDoc<any>('Curso', item.CursoID).pipe(
        map(detalles => ({
          imagen: detalles?.imagen || 'https://ionicframework.com/docs/img/demos/avatar.svg',
          precio: detalles?.Precio || 0,
          nombre: detalles?.Nombre || 'Nombre Curso',
          tipo: 'Curso'
        })),
        catchError(error => {
          console.error('Error al obtener el curso:', error);
          return of({
            imagen: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            precio: 0,
            nombre: 'Nombre Curso',
            tipo: 'Curso'
          });
        })
      );
    } else {
      return of({
        imagen: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        precio: 0,
        nombre: 'Nombre Desconocido',
        tipo: 'Desconocido'
      });
    }

    return detalles$;
  }

  agregarProductoAlCarrito(producto: any) {
    const carritoItem: CarritoCompra = {
      CarritoID: "OZEgDQwqAdMKcGeKw6ed",
      ProductoID: producto.id, // Asumiendo que 'id' es el identificador del producto
      CursoID: "",
      MetodoPagoID: "lVZdQNTm2XcUmGb3oV8t",
      UsuarioID: "PqVlhmDRs4j5MGOchMPt"
    };

    const currentCarrito = this.carritoSubject.value; // Obtiene el carrito actual
    this.carritoSubject.next([...currentCarrito, carritoItem]); // Actualiza el carrito
  }

  setCarrito(carrito: CarritoCompra[]) {
    this.carritoSubject.next(carrito);
  }

  getCarrito(): CarritoCompra[] {
    return this.carrito;
  }

  actualizarTotal(): Observable<number> {
    const detallesObservables = this.carrito.map(item => this.obtenerDetallesItem(item));

    return forkJoin(detallesObservables).pipe(
      map(detallesArray => {
        return detallesArray.reduce((total, detalles) => {
          return total + (detalles?.precio || 0);
        }, 0);
      }),
      catchError(error => {
        console.error('Error al obtener detalles:', error);
        return of(0); // Retorna 0 en caso de error
      })
    );
  }
}
