import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-detalle-renta',
  templateUrl: './detalle-renta.page.html',
  styleUrls: ['./detalle-renta.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,    
  ]
})
export class DetalleRentaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
