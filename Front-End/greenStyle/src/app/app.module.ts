import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListaBrechosComponent } from './componentes/lista-brechos/lista-brechos.component';
import { SolicitacaoParceiroComponent } from './componentes/solicitacao-parceiro/solicitacao-parceiro.component';
import { ListaProdutosGeralComponent } from './componentes/lista-produtos-geral/lista-produtos-geral.component';
import { ListaProdutosBrechoComponent } from './componentes/lista-produtos-brecho/lista-produtos-brecho.component';
import { SobreNosComponent } from './componentes/sobre-nos/sobre-nos.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RodapeComponent,
    HomeComponent,
    ListaBrechosComponent,
    SolicitacaoParceiroComponent,
    ListaProdutosGeralComponent,
    ListaProdutosBrechoComponent,
    SobreNosComponent,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
