import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../Models/Produto';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  produto: Produto[] = []
  total: number = 0

  constructor(
    private http: HttpClient,
    private alertas: AlertasService
  ) { }

  addToCarrinho(produto: Produto) {
    let cont = 0
    this.produto.forEach(element => {

      if (element.id == produto.id) {
        cont++

      }
    })
    if (cont == 0) {
      this.produto.push(produto)
      this.total = this.total + produto.preco
      this.alertas.showAlertSuccess("Item adicionado com sucesso")
    }
    else {
      this.alertas.showAlertDanger("Esse produto já foi adicionado no carrinho")
    }
  }

  apagarItem(produto: Produto) {

    const index: number = this.produto.indexOf(produto)
    if (index !== -1) {
      this.produto.splice(index, 1)
    }
    this.total = this.total - produto.preco
    this.alertas.showAlertDanger("Item removido do carrinho")
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
