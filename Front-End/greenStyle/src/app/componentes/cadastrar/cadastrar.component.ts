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

<<<<<<< HEAD
  cadastrar(){
    // this.usuario.tipo = this.tipoUsuario

    // if(this.usuario.senha != this.confirmeSenha){
    //   alert('As senhas não são iguais')
    // }else{
    //   this.tipoUsuario = "normal"
    //   this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
    //     this.usuario = resp        
    //     this.router.navigate(['/home'])
    //     alert("Cadastro Realizado com sucesso!")

    //   })
    
    // }
    this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp 
      alert("Cadastro Realizado com sucesso!")
       })
=======
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

>>>>>>> 1b0ad901300170ba2cc55b7675bac5c8f4a04eee
  }
  

}
