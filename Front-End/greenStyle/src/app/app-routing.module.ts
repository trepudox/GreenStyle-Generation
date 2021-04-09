import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListaBrechosComponent } from './componentes/lista-brechos/lista-brechos.component';
import { ListaProdutosBrechoComponent } from './componentes/lista-produtos-brecho/lista-produtos-brecho.component';
import { ListaProdutosGeralComponent } from './componentes/lista-produtos-geral/lista-produtos-geral.component';
import { SobreNosComponent } from './componentes/sobre-nos/sobre-nos.component';
import { TelaAdminComponent } from './componentes/tela-admin/tela-admin.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'brechos', component: ListaBrechosComponent},
  {path: 'sobre-nos', component: SobreNosComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'admin', component: TelaAdminComponent},

  {path: 'produtos-brecho/:id', component: ListaProdutosBrechoComponent},
  {path: 'produtos-geral/filtro/:id', component: ListaProdutosGeralComponent},
  {path: 'produtos-geral/filtro/:id/search/:nome', component: ListaProdutosGeralComponent},
  
  {path: 'produtos-geral/filtro', redirectTo: 'produtos-geral/filtro/0', pathMatch:'full'},
  {path: 'produtos-geral', redirectTo: 'produtos-geral/filtro/0', pathMatch:'full'},
  {path: '', redirectTo: 'home', pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
