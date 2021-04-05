import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  finalizarCompra ()
  {
    alert("Compra finalizada com sucesso! Você receberá uma confirmação por email assim que o pagamento for aprovado")
  }

}
