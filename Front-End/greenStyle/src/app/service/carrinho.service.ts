import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../Models/Produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  produto: Produto[] = []

  constructor(
    private http: HttpClient
  ) { }

  addToCarrinho(produto: Produto)
  {
    this.produto.push(produto)
  }

  getProdutos()
  {
    return this.produto
  }

  limparCarrinho()
  {
    this.produto = []
    return this.produto
  }

  valorProdutos()
  {
    return this.http.get<{preco: number}[]> ('/assets/produto.json')

  }


}
