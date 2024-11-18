import { Component, OnInit } from '@angular/core';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCard, IonModal, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Video } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonModal,
    CommonModule,
    IonIcon
  ]
})
export class VideosPage implements OnInit {
  
  videos: Video[] = []; // Definimos el tipo de la lista como Video[]
  modalVideo = false;
  rutaVideo: string = ''; // Para almacenar la URL del video a reproducir

  constructor(private firestoreService: FirestoreDatabaseService) {
    addIcons({ close });
  }

  ngOnInit() {
    this.obtenerVideos();
  }

  obtenerVideos() {
    this.firestoreService.getCollectionChanges<Video>('Video').subscribe((data: Video[]) => {
      this.videos = data;
    });
  }

  abrirReproductor(videoURL: string) {
    console.log("URL del video:", videoURL);
    this.rutaVideo = videoURL; // Asigna la URL del video seleccionado
    this.modalVideo = true;
  }

}