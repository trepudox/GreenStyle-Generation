import { Component, Input, OnInit} from '@angular/core';
import { Produto } from 'src/app/Models/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
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
    private carrinhoService: CarrinhoService,
    private alertas: AlertasService
   ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  finalizarCompra ()
  {
    this.alertas.showAlertSuccess("Compra finalizada com sucesso! Você receberá uma confirmação por email assim que o pagamento for aprovado")
  }


 



}
