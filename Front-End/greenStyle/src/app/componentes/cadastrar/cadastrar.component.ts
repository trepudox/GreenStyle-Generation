import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  
  usuario: Usuario = new Usuario()
  confirmeSenha: string  
  tipoUsuario: string


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)   
  }

  confirmarSenha(event: any){
    this.confirmeSenha = event.target.value
  }

  cadastrar() {
    if (this.usuario.senha != this.confirmeSenha) {
      this.alertas.showAlertDanger('As senhas não são iguais')
    } else {
      if(this.usuario.nome.startsWith("G@S")) {
        this.usuario.tipo = "adm"
      } else {
        this.usuario.tipo = "normal"
      }
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/home'])
        this.alertas.showAlertSuccess("Cadastro Realizado com sucesso!")
      })

    }

  }
  

}
