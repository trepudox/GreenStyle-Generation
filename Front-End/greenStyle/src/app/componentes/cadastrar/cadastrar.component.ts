import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
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
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)   
  }

  confirmarSenha(event: any){
    this.confirmeSenha = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = "normal"
    if (this.usuario.senha != this.confirmeSenha) {
      alert('As senhas não são iguais')


    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/home'])
        alert("Cadastro Realizado com sucesso!")
      })

    }

  }
  

}
