import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard, IonButton, IonInput } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonButton,
    IonInput, 
    FormsModule,
    CommonModule
  ]
})
export class LogInPage implements OnInit {

  nombreUsuario: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController, 
    private firestoreService: FirestoreDatabaseService
  ) { }

  ngOnInit() {}

  irRuta(ruta: string) {
    this.navCtrl.navigateForward(ruta, { animated: false });
  }

  iniciarSesion() {
    // Obtener la colección de usuarios
    this.firestoreService.getCollectionChanges<any>('Usuario').subscribe((usuarios) => {
      // Verificar si existe un usuario con los datos ingresados
      const usuario = usuarios.find(
        (u: any) =>
          u.Nombre === this.nombreUsuario &&
          u.Contrasena === this.contrasena
      );

      if (usuario) {
        // Si coincide, redirigir a la página de inicio
        this.irRuta('renta');
      } else {
        // Si no coincide, mostrar mensaje de error en un alert
        alert('Nombre de usuario o contraseña incorrectos.');
      }
    });
  }
}
