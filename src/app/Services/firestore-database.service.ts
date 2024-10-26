import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, docData, updateDoc, collectionData, WithFieldValue, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {

  constructor(private firestore: Firestore) { }

  // Nuevo Registro
  createDocument<tipo extends WithFieldValue<DocumentData>>(datos: tipo, enlace: string, id: string) {
    const docRef = doc(this.firestore, `${enlace}/${id}`);
    return setDoc(docRef, datos);
  }

  // Nuevo ID
  crearId(coleccion: string): string {
    return doc(collection(this.firestore, coleccion)).id;
  }

  // Obtener un Documento
  getDocumentChanges<tipo>(enlace: string): Observable<tipo | undefined> {
    const docRef = doc(this.firestore, enlace);
    return docData(docRef) as Observable<tipo | undefined>;
  }

  // Obtener una Colección
  getCollectionChanges<tipo>(enlace: string): Observable<tipo[]> {
    const collectionRef = collection(this.firestore, enlace);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<tipo[]>;
  }

  // Obtener Documento Específico
  getDoc<tipo>(path: string, id: string): Observable<tipo | undefined> {
    const docRef = doc(this.firestore, `${path}/${id}`);
    return docData(docRef) as Observable<tipo | undefined>;
  }

  // Actualizar Documento
  updateDoc(datos: any, path: string, id: string) {
    const docRef = doc(this.firestore, `${path}/${id}`);
    return updateDoc(docRef, datos);
  }
}
