import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Models/Produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  
 
  produto = this.carrinhoService.getProdutos()
  total = this.carrinhoService.calculaTotal()
  
  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
   ) { }

  ngOnInit() {
    window.scroll(0, 0)

  }

  finalizarCompra ()
  {
    alert("Compra finalizada com sucesso! Você receberá uma confirmação por email assim que o pagamento for aprovado")
    this.carrinhoService.limparCarrinho()
    this.router.navigate(['/home'])

  }

  apagarItem(id: number)
  {
    this.carrinhoService.apagarItem(id)
    console.log(this.produto)
  }



  


 



}
