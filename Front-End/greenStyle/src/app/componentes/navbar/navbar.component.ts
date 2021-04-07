import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioLogin } from 'src/app/Models/UsuarioLogin';
import { AuthService } from 'src/app/service/auth.service';

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
      this.router.navigate(['/home'])

    })

  }


}
