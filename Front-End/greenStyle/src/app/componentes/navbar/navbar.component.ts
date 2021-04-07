import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  textoPesquisa: string

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  pesquisarProduto(s: string) {
    this.router.navigate([`/produtos-geral/filtro/0/search/${s}`])
  }

  navegarParaTodosOsProdutos() {
    this.router.navigate(["/produtos-geral/filtro/0"])
  }

}
