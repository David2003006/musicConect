import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, docData, updateDoc, collectionData, WithFieldValue, DocumentData,query, where, getDocs} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Curso } from '../Models/Interfaces';
import { map } from 'rxjs/operators';


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

  getCursoByField(CursoID: string): Observable<Curso | undefined> {
    const collectionRef = collection(this.firestore, 'Curso'); // Ruta a la colección
    const q = query(collectionRef, where('CursoID', '==', CursoID)); // Filtro por el campo CursoID
    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]; // Obtiene el primer documento que coincida
          const data = doc.data(); // Obtiene los datos del documento
          
          // Construcción manual del objeto basado en la interfaz Curso
          const curso: Curso = {
            CursoID: data['CursoID'] || '',
            Nombre: data['Nombre'] || '',
            Precio: data['Precio'] || '',
            UsuarioID: data['UsuarioID'] || '',
            Requisitos: data['Requisitos'] || '',
            Descripcion: data['Descripcion'] || '',
            Contenido: data['Contenido'] || '',
            imagen: data['imagen'] || ''
          };
  
          return curso; // Retorna el objeto Curso
        }
        return undefined; // Si no hay coincidencias, retorna undefined
      })
    );
  }

  // Actualizar Documento
  updateDoc(datos: any, path: string, id: string) {
    const docRef = doc(this.firestore, `${path}/${id}`);
    return updateDoc(docRef, datos);
  }
}
