
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router, RoutesRecognized } from '@angular/router';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
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
  idFiltro: number
  stringPesquisa: string
  nomeCategoriaAtual: String
  listaProduto: Produto[]
  listaCategoria: Categoria[]
  produtoModal: Produto

  key = "disponivel"
  reverse = true


  paginaAtual:number=1

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private alertas: AlertasService,
    private router: Router
  ) {

    router.events.subscribe((e) => {

      if (e instanceof NavigationEnd) {
        route.params.subscribe(p => {
          this.idFiltro = p.id
          this.stringPesquisa = p.nome
        })

        this.setNomeCategoriaAtual(this.idFiltro)
        this.setListaProduto(this.idFiltro, this.stringPesquisa)
        this.paginaAtual=1
      }

    })

  }

  ngOnInit() {
    window.scroll(0, 0)

    this.idFiltro = 0
    this.stringPesquisa = ""

    this.produtoModal = <Produto>({
      id: 0,
      nome: "",
      preco: 0,
      foto: "",
      categoria: new Categoria(),
      brecho: new Brecho()
    })
    this.setListaCategoria()
  }

  setListaProduto(id: number, s: string) {
    if (id == 0) {

      if (this.stringPesquisa != undefined) {
        this.produtoService.getByNomeProduto(s).subscribe((resp: Produto[]) => {
          this.listaProduto = resp
        })

      } else {
        this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
          this.listaProduto = resp
        })
      }

    } else {

      this.produtoService.getByIdCategoriaProdutos(id).subscribe((resp: Produto[]) => {
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

  addToCarrinho(produto: Produto) {
    this.carrinhoService.addToCarrinho(produto)
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

  deslocamento(){
    window.scroll({
      top: 300,
      behavior: 'smooth'
    })
  }

}

