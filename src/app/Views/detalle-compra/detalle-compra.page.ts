import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,    
  ]
})
export class DetalleCompraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
