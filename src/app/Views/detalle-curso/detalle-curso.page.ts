import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.page.html',
  styleUrls: ['./detalle-curso.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent
  ]
})
export class DetalleCursoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
