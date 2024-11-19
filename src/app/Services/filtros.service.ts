import { Injectable } from '@angular/core';
import { FirestoreDatabaseService } from './firestore-database.services';
import { map, Observable } from 'rxjs';
import { contractOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  constructor(private fire : FirestoreDatabaseService) { }

  getCategoriaIdByName(categoriaNombre: string): Observable<string | undefined> {
    return this.fire.getCollectionChanges('Categoria').pipe( // Asegúrate de usar el nombre correcto de la colección
      map((categorias: any[]) => {
        // Filtrar las categorías que empiezan con el nombre recibido
        const categoriaEncontrada = categorias.find(categoria => categoria.Nombre.startsWith(categoriaNombre));
        return categoriaEncontrada ? categoriaEncontrada.id : null; // Retorna el ID de la categoría o undefined si no se encuentra
      })
    );
  }


}
