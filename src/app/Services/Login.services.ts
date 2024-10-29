import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Usuario } from '../Models/Interfaces';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  private collectionName = 'Usuario'

  constructor(private firestore: Firestore) { }

  async creatUsusario(usuarioAdd : Usuario){
    try{
      const docRef= await addDoc(collection(this.firestore, this.collectionName), usuarioAdd);
      console.log("Usuario con registrado con exito");
      return true;
    }catch(error){
      console.log("Error al intentar guardar al usuario");
      return false
      throw error;
    }
  }

  async UsuarioExiste(correo: string, password: string): Promise<boolean> {
    const usuarioRef = collection(this.firestore, this.collectionName);
    const q = query(usuarioRef, where('Correo', '==', correo), where('Contraseña', '==', password));
    const querySnapshots = await getDocs(q);
  
    if (querySnapshots.docs.length > 0) {
      const usuarioData = querySnapshots.docs[0].data() as Usuario;
      return true;
    } else {
      return false;
    }
  }
  
}
