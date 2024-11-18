import { Component, OnInit } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonModal, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
  standalone: true,
  imports: [IonContent,
    HeaderComponent,
    IonInput,
    IonSelect, IonSelectOption,
    IonCard,
    IonModal,
    IonIcon
  ]
})
export class VideosPage implements OnInit {

  constructor() {

    addIcons({ close });

   }

  ngOnInit() {
  }

  modalVideo = false;

  abrirReproductor(idVideo: string){

    this.modalVideo = true;

  }

}
