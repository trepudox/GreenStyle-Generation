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
    this.setListasProduto()
  }




  setListasProduto() {

    for (let x = 1; x <= 8; x++) {

      this.produtoService.getByIdProduto(x).subscribe((resp: Produto) => {
        if (x < 5) {
          this.listaProduto1.push(resp)
        } else {
          this.listaProduto2.push(resp)
        }
      })

    }

  }

  setListasProduto2() {
    let listaProdutoRandom: Produto[] = []
    
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      let listaTodosOsProdutos: Produto[] = resp

      for ( ; listaProdutoRandom.length < 8;) {
        let nDaVez = Math.floor(Math.random() * listaTodosOsProdutos.length)
        
        if(listaProdutoRandom.indexOf(listaTodosOsProdutos[nDaVez]) === -1) {
          
          this.produtoService.getByIdProduto(nDaVez).subscribe((resp: Produto) => {

            listaProdutoRandom.push(resp)

          })
          
        }
      
      }

      this.listaProduto1 = listaProdutoRandom.slice(0, 4)
      this.listaProduto2 = listaProdutoRandom.slice(4, 8)
      alert("saiu")

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

