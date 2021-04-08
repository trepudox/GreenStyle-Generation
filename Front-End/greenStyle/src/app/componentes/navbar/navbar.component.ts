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


  textoPesquisa: string

  usuarioLogin : UsuarioLogin = new UsuarioLogin()
  nome:string
  tipo:string = environment.tipo

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
    this.logado()

  }

  logado(){

      if(environment.token != ''){
        this.nome=environment.nome
        this.tipo=environment.tipo

        return true
      }
      else{
        return false
      }

  }

  entrar(){

    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.id = this.usuarioLogin.id
      environment.email = this.usuarioLogin.email
      environment.tipo = this.usuarioLogin.tipo

    }, erro => {
      if(erro.status == 500){
        alert("Usuário ou senha estão incorretos")
      }
    })
  }

pesquisarProduto(s: string) {
    this.router.navigate([`/produtos-geral/filtro/0/search/${s}`])
  }

  navegarParaTodosOsProdutos() {
    this.router.navigate(["/produtos-geral/filtro/0"])
   }


}
