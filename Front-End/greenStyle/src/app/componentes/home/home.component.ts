import { Component, OnInit } from '@angular/core';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
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
    private carrinhoService: CarrinhoService,
    private alertas: AlertasService
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
    this.setListasProduto()
  }

  setListasProduto() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      resp.forEach((p: Produto) => {
        if (this.listaProduto1.length < 4 && p.disponivel == true) {
          this.listaProduto1.push(p)
        } else if (this.listaProduto2.length < 4 && p.disponivel == true) {
          this.listaProduto2.push(p)
        }

        if (this.listaProduto1.length + this.listaProduto2.length == 8) {
          return
        }

      })
    })

  }

  setProdutoModal(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produtoModal = resp
    })
  }

  addToCarrinho(produto: Produto) {
    this.carrinhoService.addToCarrinho(produto)
  }

 }

