import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-lista-produtos-geral',
  templateUrl: './lista-produtos-geral.component.html',
  styleUrls: ['./lista-produtos-geral.component.css']
})
export class ListaProdutosGeralComponent implements OnInit, OnChanges {

  idFiltro: number
  stringPesquisa: string

  nomeCategoriaAtual: String

  listaProduto: Produto[]
  listaCategoria: Categoria[]

  produtoModal: Produto


  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.route.params.subscribe(p => {
      changes
    })
  }

  ngOnInit(): void {
    window.scroll(0, 0)

    this.route.params.subscribe(p => {
      this.stringPesquisa = p.nome
      this.idFiltro = p.id
    })
    
    this.produtoModal = <Produto>({
      id: 0,
      nome: "",
      preco: 0,
      foto: "",
      categoria: new Categoria(),
      brecho: new Brecho()
    })
    this.setListaCategoria()
    this.setNomeCategoriaAtual(this.idFiltro)
    this.setListaProdutoPorFiltro(this.idFiltro)

  }
  
  setListaProdutoPorFiltro(id: number) {
    if (id == 0) {
      this.setListaProduto(this.stringPesquisa)
    } else {
      this.produtoService.getByIdCategoriaProdutos(id).subscribe((resp: Produto[]) => {
        this.listaProduto = resp
      })
    }
  }

  setListaProduto(s: string) {
    if (this.idFiltro == 0 && this.stringPesquisa != undefined) {
      this.produtoService.getByNomeProduto(s).subscribe((resp: Produto[]) => {
        this.listaProduto = resp
      })
    } else {
      this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
        this.listaProduto = resp
      })
    }
  }

  setListaCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  setProdutoModal(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produtoModal = resp
    })
  }

  setNomeCategoriaAtual(id: number) {
    if (id == 0) {
      this.nomeCategoriaAtual = "Todos os produtos"
    } else {
      this.categoriaService.getById(id).subscribe((resp: Categoria) => {
        this.nomeCategoriaAtual = resp.nome
      })
    }

    this.nomeCategoriaAtual = this.nomeCategoriaAtual == undefined ? "Erro 404" : this.nomeCategoriaAtual
  }

}
