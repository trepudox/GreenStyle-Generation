import { Component, OnInit } from '@angular/core';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtoModal: Produto

  listaProduto1: Produto[] = []
  listaProduto2: Produto[] = []

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.produtoModal = <Produto>({
      id: 0,
      nome: "",
      preco: 0,
      foto: "",
      categoria: new Categoria(),
      brecho: new Brecho()
    })
    this.setListaProduto()
  }

  setListaProduto() {
    for (let x = 1; x < 5; x++)
      this.produtoService.getByIdProduto(x).subscribe((resp: Produto) => {
        this.listaProduto1.push(resp)
      })
  }

  setProdutoModal(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produtoModal = resp
    })
  }

  addToCarrinho(produto: Produto) {
    this.carrinhoService.addToCarrinho(produto)
    alert("Item adicionado com sucesso")
  }

}
