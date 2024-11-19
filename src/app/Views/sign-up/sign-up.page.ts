import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard, IonInput, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.services';
import { Usuario } from 'src/app/Models/Interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonInput,
    IonButton,
    FormsModule
  ]
})
export class SignUpPage implements OnInit {
  nombreUsuario: string = '';
  correo: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private fire: FirestoreDatabaseService
  ) {}

  ngOnInit() {}

  irRuta(ruta: string) {
    this.navCtrl.navigateForward(ruta, { animated: false });
  }

  async crearUsuario() {
    if (this.validarFormulario()) {
      try {
        const nuevoID = this.fire.crearId('Usuario'); // Generar un nuevo ID
        const nuevoUsuario: Usuario = {
          UsuarioID: nuevoID,
          Nombre: this.nombreUsuario,
          Correo: this.correo,
          Contrasena: this.contrasena,
          Rol: 'oMZUzZmFRSZmsizBtYY4' // Valor por defecto para el rol
        };

        // Guardar en Firestore
        await this.fire.createDocument(nuevoUsuario, 'Usuario', nuevoID);
        alert('Usuario creado exitosamente.');
        this.irRuta('log-in'); // Redirigir al login
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        alert('Ocurrió un error al crear el usuario. Inténtalo de nuevo.');
      }
    }
  }

  validarFormulario(): boolean {
    if (!this.nombreUsuario || !this.correo || !this.contrasena || !this.repetirContrasena) {
      alert('Por favor, completa todos los campos.');
      return false;
    }
    if (this.contrasena !== this.repetirContrasena) {
      alert('Las contraseñas no coinciden.');
      return false;
    }
    return true;
  }
}
