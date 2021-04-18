import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/Models/Usuario';

import { UsuarioLogin } from 'src/app/Models/UsuarioLogin';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tamanhoCarrinho: number = 0

  textoPesquisa: string

  usuarioLogin : UsuarioLogin = new UsuarioLogin()
  nome:string
  tipo:string = environment.tipo

  constructor( 
    private auth: AuthService, 
    private router: Router,
    private alertas: AlertasService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.logado()
    this.adm()
    this.carrinhoService.currentMessage.subscribe(tamanho => this.tamanhoCarrinho = tamanho)
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

  adm(){
    if(environment.tipo=="adm"){
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

      this.alertas.showAlertInfo("Logado com sucesso!")
      if(this.router.url.includes("cadastrar")) {
        this.router.navigate(["/home"])
      }
    }, erro => {
      if(erro.status == 500){
        this.alertas.showAlertDanger("Usuário ou senha estão incorretos")
      }
    })
  }

  sair(){
      environment.id=0
      environment.email=''
      environment.nome=''
      environment.tipo=''
      environment.token=''

      this.usuarioLogin = new UsuarioLogin()
      this.router.navigate(['/home'])
      this.alertas.showAlertInfo("Deslogado com sucesso!")
      this.logado()
  }

  pesquisarProduto(s: string) {
    this.router.navigate([`/produtos-geral/filtro/0/search/${s}`])
  }

  navegarParaTodosOsProdutos() {
    this.router.navigate(["/produtos-geral/filtro/0"])
   }


}
