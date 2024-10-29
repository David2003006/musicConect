import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard, IonInput, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/Models/Interfaces';
import { FirestoreDatabaseService } from 'src/app/Services/firestore-database.service';
import { FireAuthService } from 'src/app/Services/fire-auth.service';
import { LoginServicesService } from 'src/app/Services/Login.services';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    FormsModule
  ]
})
export class SignUpPage implements OnInit {
  createUser : Usuario = {UsuarioID: this.fire.crearId('AVCD'), Nombre:'', Correo: '', Contrasena: '', Rol:'mG7RAWl4htklTkGEIBzR' }

  constructor(private navCtrl: NavController,
    private access: LoginServicesService, 
    private secury: FireAuthService,
    private fire: FirestoreDatabaseService) { }

  ngOnInit() {}

  async registerUser(user: Usuario)
  {
      const confirmacion =  await this.access.creatUsusario(this.createUser)
      const key  = this.secury.login(user.Correo, user.Contrasena)

      if((!confirmacion) && (key == null)){
        alert("No se pudo completar su incripcion")
        this.irRuta('sign-up')
      }else
      this.irRuta('inicio')
  }

  irRuta(ruta: string){
    this.navCtrl.navigateForward(ruta, { animated: false });
  }

}
