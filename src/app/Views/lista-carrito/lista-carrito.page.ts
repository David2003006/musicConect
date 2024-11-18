import { Component, OnInit } from '@angular/core';
import { IonContent, IonList, IonItem, IonIcon, IonButton, IonListHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-lista-carrito',
  templateUrl: './lista-carrito.page.html',
  styleUrls: ['./lista-carrito.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    IonList, IonListHeader, IonItem,
    IonIcon,
    IonButton
  ]
})
export class ListaCarritoPage implements OnInit {

  constructor() { 

    addIcons({ trash });

  }

  ngOnInit() {
  }

}
