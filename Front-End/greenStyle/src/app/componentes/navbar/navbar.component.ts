import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';

import { UsuarioLogin } from 'src/app/Models/UsuarioLogin';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  usuarioLogin : UsuarioLogin = new UsuarioLogin()

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {      
      this.usuarioLogin = resp     

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.id = this.usuarioLogin.id
      environment.email = this.usuarioLogin.email
      environment.tipo = this.usuarioLogin.tipo      

      alert("login realizado com sucesso")
     

    }, erro => {
      if(erro.status == 500){
        alert("Usuário ou senha estão incorretos")
      }
    })
  }


}
