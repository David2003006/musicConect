import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard, IonButton, IonInput } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginServicesService } from 'src/app/Services/Login.services';
import { FireAuthService } from 'src/app/Services/fire-auth.service';
import { Login } from 'src/app/Models/Interfaces';

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
    CommonModule,
    FormsModule
  ]
})
export class LogInPage implements OnInit {
   acceso: Login = {correo: '', contrasena: ''}

  constructor(private navCtrl: NavController,
    private login : LoginServicesService,
    private secury: FireAuthService
  ) { }

  ngOnInit() {
  }

  async Login(acceso: Login)
  {
    const existe = await this.login.UsuarioExiste(acceso.correo, acceso.contrasena)
    const credenciales = this.secury.login(acceso.correo, acceso.contrasena)
    if((!existe) || (credenciales == null))
    {
      alert("Error contraseña o correo invalidos")
      this.irRuta('log-in')
    }else
    {
      this.irRuta('inicio')
    }
  }
  
  irRuta(ruta: string){
    this.navCtrl.navigateForward(ruta, { animated: false });
  }

}
