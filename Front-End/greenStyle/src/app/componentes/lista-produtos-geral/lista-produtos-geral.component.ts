import { Component, Input, OnInit } from '@angular/core';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-lista-produtos-geral',
  templateUrl: './lista-produtos-geral.component.html',
  styleUrls: ['./lista-produtos-geral.component.css']
})
export class ListaProdutosGeralComponent implements OnInit {

  categoria: Categoria = new Categoria()
  produto: Produto = new Produto()
  listaProduto: Produto[]
  listaCategoria: Categoria[]
  produtoModal: Produto

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {
   }

  ngOnInit(): void {
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
    this.setListaCategoria()
   
  }

  setListaProduto() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => this.listaProduto = resp)
  }

  setListaCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => this.listaCategoria = resp)
  }

  setListaFiltro(id: number) {
    this.produtoService.getByIdCategoriaProdutos(id).subscribe((resp: Produto[]) => this.listaProduto = resp)
  }

  setProdutoModal(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produtoModal = resp
    })
  }

  addToCarrinho(produto: Produto)
  {
    this.carrinhoService.addToCarrinho(produto)
    alert("Item adicionado com sucesso")
  }

}
