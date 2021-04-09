import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { BrechoService } from 'src/app/service/brecho.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-lista-produtos-brecho',
  templateUrl: './lista-produtos-brecho.component.html',
  styleUrls: ['./lista-produtos-brecho.component.css']
})
export class ListaProdutosBrechoComponent implements OnInit {

  idBrecho: number
  brechoPag: Brecho

  produtoModal: Produto

  listaProduto: Produto[]
  listaCategoria: Categoria[]

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private brechoService: BrechoService,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.idBrecho = this.route.snapshot.params["id"]

    this.produtoModal = <Produto>({
      id: 0,
      nome: "",
      preco: 0,
      foto: "",
      categoria: new Categoria(),
      brecho: new Brecho()
    })
    this.setBrecho()
    this.setListaCategoria()
    this.setListaProduto(this.idBrecho)
  }
  
  setListaCategoria () {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=> this.listaCategoria = resp)
  }

  setListaProduto(id: number) {
    this.produtoService.getByIdBrechoProdutos(id).subscribe((resp: Produto[]) => {
      this.listaProduto = resp
    })
  }

  setListaFiltro(id: number) {
    this.produtoService.getByIdCategoriaProdutos(id).subscribe((resp: Produto[]) => {
      this.listaProduto = []

      for(let item of resp) {
        
        if(item.brecho.id == this.idBrecho) {
          this.listaProduto.push(item)
        }

      }
    })
  }

  setBrecho() {
    this.brechoService.getById(this.idBrecho).subscribe((resp: Brecho) => {
      this.brechoPag = resp
    })
  }

  setProdutoModal(id: number){
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
