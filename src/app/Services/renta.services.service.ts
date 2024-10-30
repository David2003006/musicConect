import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RentaServicesService {

  private collectionName: string = 'Producto';

  constructor(private firestore: Firestore) { }

  

}
