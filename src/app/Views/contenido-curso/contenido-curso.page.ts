import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { caretDown } from 'ionicons/icons';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.page.html',
  styleUrls: ['./contenido-curso.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    IonIcon
  ]
})
export class ContenidoCursoPage implements OnInit {

  constructor() {

    addIcons({ caretDown });

  }

  ngOnInit() {
  }

}
