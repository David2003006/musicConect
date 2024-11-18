import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { addCircleOutline, cart } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CarritoComponent } from '../carrito/carrito.component';
import { NavController } from '@ionic/angular';
import { Curso } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
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
export class CursosPage implements OnInit {

  cursos: Curso[] = [];
  estadoCarrito: boolean = false;
  constructor(private eRef: ElementRef, private navCtrl: NavController,
               private fire: FirestoreDatabaseService
  ) {

    addIcons({ addCircleOutline, cart });

   }

  ngOnInit() {
    this.cargarCursos();
  }


  cargarCursos() {
   //Aquí puedes agregar tu lógica para obtener los cursos desde Firestore u otro servicio
    this.fire.getCollectionChanges<Curso>('Curso').subscribe(cursos => {
      console.log('Cursos recibidos:', cursos);
     this.cursos = cursos;
     console.log('Cursos recibidos:', cursos);
    });
   }


  cambiarEstadoCarrito() {
    this.estadoCarrito = !this.estadoCarrito;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {

    if (!this.eRef.nativeElement.contains(event.target)) {

      this.estadoCarrito = false;

    }

  }

  getPrecioFormateado(precio: string): string {
    return parseFloat(precio).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  irDetalleCurso(id: string) {

    this.navCtrl.navigateForward("curso/DetalleCurso/" + id, { animated: false });

  }
}