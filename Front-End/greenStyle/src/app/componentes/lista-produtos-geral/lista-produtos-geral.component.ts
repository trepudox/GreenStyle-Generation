import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-lista-produtos-geral',
  templateUrl: './lista-produtos-geral.component.html',
  styleUrls: ['./lista-produtos-geral.component.css']
})
export class ListaProdutosGeralComponent implements OnInit {
  
  categoria: Categoria = new Categoria()
  listaProduto: Produto[]
  listaCategoria: Categoria[]
 
  
  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    this.setListaProduto()
    this.setListaCategoria()

  }

  setListaProduto()
  {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=> this.listaProduto = resp)
  }

  setListaCategoria ()
  {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=> this.listaCategoria = resp)
  }

  setListaFiltro(id: number)
  {
    this.produtoService.getByIdCategoriaProdutos(id).subscribe((resp: Produto[])=> this.listaProduto = resp)
  }


  cadastrarCategoria()
  {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=> this.categoria = resp)
    this.categoria = new Categoria()
  }

}
