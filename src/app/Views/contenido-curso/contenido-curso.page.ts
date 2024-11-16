import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { caretDown } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.page.html',
  styleUrls: ['./contenido-curso.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    IonIcon,
    CommonModule
    
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', [animate('900ms ease-in-out')])
    ])
  ]
})
export class ContenidoCursoPage implements OnInit {

  constructor() {

    addIcons({ caretDown });

  }

  ngOnInit() {
  }

    // Arreglo que representa las secciones
    sections = [1, 2, 3, 4]; // Puedes añadir tantas secciones como necesites

    // Estado de visibilidad para cada sección
    visibleSections: boolean[] = Array(this.sections.length).fill(false);
  
    // Alterna la visibilidad de una sección específica
    toggleVisibility(index: number): void {
      this.visibleSections[index] = !this.visibleSections[index];
    }

  

}
