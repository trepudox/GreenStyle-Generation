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
    private produtoService: ProdutoService
  ) { }

  addToCarrinho(produto: Produto)
  {
    this.produto.push(produto)
    this.total = this.total + produto.preco
  }

  apagarItem(id: number)
  {
    let itemDelete = new Produto
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=> { itemDelete = resp
    })
   this.produto = this.produto.filter(item => item !== itemDelete)
   console.log(itemDelete)
  }

  getProdutos()
  {
    return this.produto
  }

  limparCarrinho()
  {
    this.produto = []
    this.total = 0
    return this.produto
  }

  calculaTotal()
  {
    return this.total
  }
}
