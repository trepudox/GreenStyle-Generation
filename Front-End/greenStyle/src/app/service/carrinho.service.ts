import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../Models/Produto';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  produto: Produto[] = []
  total: number = 0


  constructor(
    private http: HttpClient,
  ) { }

  addToCarrinho(produto: Produto) {

    const index: number = this.produto.indexOf(produto)
    if (index == -1) {
      this.produto.push(produto)
      this.total = this.total + produto.preco
      alert("Item adicionado com sucesso")
    }
    else {
      alert("Esse produto já foi adicionado no carrinho")
    }

  }

  apagarItem(produto: Produto) {

    const index: number = this.produto.indexOf(produto)
    if (index !== -1) {
      this.produto.splice(index, 1)
    }
    this.total = this.total - produto.preco
  }

  getProdutos() {
    return this.produto
  }

  limparCarrinho() {
    this.produto = []
    this.total = 0
    return this.produto
  }

  calculaTotal() {
    return this.total
  }

}
