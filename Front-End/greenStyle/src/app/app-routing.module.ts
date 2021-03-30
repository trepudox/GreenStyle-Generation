import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListaBrechosComponent } from './componentes/lista-brechos/lista-brechos.component';
import { ListaProdutosBrechoComponent } from './componentes/lista-produtos-brecho/lista-produtos-brecho.component';
import { ListaProdutosGeralComponent } from './componentes/lista-produtos-geral/lista-produtos-geral.component';
import { SobreNosComponent } from './componentes/sobre-nos/sobre-nos.component';
import { SolicitacaoParceiroComponent } from './componentes/solicitacao-parceiro/solicitacao-parceiro.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'brechos', component: ListaBrechosComponent},
  {path: 'solicitacao', component: SolicitacaoParceiroComponent},
  {path: 'produtos-brecho', component: ListaProdutosBrechoComponent},
  {path: 'produtos-geral', component: ListaProdutosGeralComponent},
  {path: 'sobre-nos', component: SobreNosComponent},
  {path: 'carrinho', component: CarrinhoComponent},

  {path: '', redirectTo: 'home', pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
