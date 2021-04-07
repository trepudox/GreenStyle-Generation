import { Component, Input, OnInit} from '@angular/core';
import { Produto } from 'src/app/Models/Produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  
  produto = this.carrinhoService.getProdutos()
  valorProdutos = this.carrinhoService.valorProdutos()

  constructor(
    private carrinhoService: CarrinhoService
   ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  finalizarCompra ()
  {
    alert("Compra finalizada com sucesso! Você receberá uma confirmação por email assim que o pagamento for aprovado")
  }


 



}
