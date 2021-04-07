import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HashLocationStrategy, LocationStrategy } from "@angular/common";


import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListaBrechosComponent } from './componentes/lista-brechos/lista-brechos.component';
import { ListaProdutosGeralComponent } from './componentes/lista-produtos-geral/lista-produtos-geral.component';
import { ListaProdutosBrechoComponent } from './componentes/lista-produtos-brecho/lista-produtos-brecho.component';
import { SobreNosComponent } from './componentes/sobre-nos/sobre-nos.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';
import { TelaAdminComponent } from './componentes/tela-admin/tela-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RodapeComponent,
    HomeComponent,
    ListaBrechosComponent,
    ListaProdutosGeralComponent,
    ListaProdutosBrechoComponent,
    SobreNosComponent,
    CarrinhoComponent,
    CadastrarComponent,
    TelaAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
