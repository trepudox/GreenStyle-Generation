import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Models/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  rua: string
  numero: string
  bairro: string
  cep: string
  telefone: string
  nomeDestinatario: string

  numeroCartao: string
  nomeCartao: string
  cvv: string
  validade: string
  cpf: string

  produto = this.carrinhoService.getProdutos()
  total = this.carrinhoService.calculaTotal()

  constructor(
    private carrinhoService: CarrinhoService,
    private alertas: AlertasService,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  finalizarCompra() {

    if (environment.token == "") 
    {
      this.alertas.showAlertDanger("Logue para finalizar a compra")
    }
    else {
      if (this.produto.length <= 0) {
        this.alertas.showAlertDanger("Você não possui itens no carrinho!")
      }
      else {
        if (this.rua == null && this.numero == null && this.bairro == null && this.cep == null && this.telefone == null && this.nomeDestinatario == null) {

          alert("Por favor, preencha corretamente os dados de entrega")
        }
        else {

          if (this.numeroCartao == null && this.nomeCartao == null && this.cvv == null && this.validade == null && this.cpf == null) {
            alert("Por favor, preencha corretamente os dados do cartão")
          }
          else {
            this.produto.forEach(element => {
              element.disponivel = false
              this.produtoService.putProduto(element).subscribe((resp: Produto) => { element = resp })
            });
          }
        }

        this.alertas.showAlertSuccess("Compra finalizada com sucesso! Você receberá uma confirmação por email assim que o pagamento for aprovado")
        this.carrinhoService.limparCarrinho()
        this.router.navigate(['/home'])
      }
    }
  }

  finalizarCompraBoleto()
  {
    if (environment.token == "") 
    {
      this.alertas.showAlertDanger("Logue para finalizar a compra")
    }
    else {
      if (this.produto.length <= 0) {
        this.alertas.showAlertDanger("Você não possui itens no carrinho!")
      }
      else {
        this.alertas.showAlertSuccess("O boleto foi gerado e enviado para o email cadastrado")
        this.carrinhoService.limparCarrinho()
        this.router.navigate(['/home'])
      }
    }
  }

  apagarItem(produto: Produto) {

    this.carrinhoService.apagarItem(produto)
  }

  calculaTotal() {
    return this.carrinhoService.calculaTotal()
  }

}
