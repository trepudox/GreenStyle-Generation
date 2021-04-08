import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { Produto } from 'src/app/Models/Produto';
import { BrechoService } from 'src/app/service/brecho.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.css']
})
export class TelaAdminComponent implements OnInit {

  brecho:Brecho = new Brecho
  listaBrechos:Brecho[]
  brechoModal = new Brecho

  categoria:Categoria = new Categoria
  listaCategorias:Categoria[]
  categoriaModal = new Categoria

  produto:Produto = new Produto
  listaProdutos:Produto[]
  idBrecho:number
  idCategoria:number
  brechoProduto:Brecho = new Brecho
  categoriaProduto:Categoria = new Categoria
  idListaBrecho:number

  constructor(
    private brechoService: BrechoService,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.verificaUser()
  }

  verificaUser(){
    if(environment.token==''){
      alert('AVISO: VOCÊ NÃO ESTA LOGADO, POR GENTILEZA LOGUE COMO ADM PARA TER ACESSO Á ESTE SERVIÇO')
      this.router.navigate(['/home'])
    }
    else if(environment.tipo != 'adm'){
      alert('AVISO: VOCÊ NÃO É UM ADM, POR GENTILEZA LOGUE COMO ADM PARA TER ACESSO Á ESTE SERVIÇO')
      this.router.navigate(['/home'])
    }
    else{
      this.getAllBrechos()
      this.getAllCategorias()

      this.brechoModal = <Brecho> ({
        id:0,
        nome:'',
        descricao:'',
        fotoPerfil:'',
        fotoCapa:''
      })
      this.categoriaModal = <Categoria> ({
        id:0,
        nome:''
      })

    }
  }

// CRUD BRECHOS

  getAllBrechos(){
    this.brechoService.getAll().subscribe((resp: Brecho[])=>{
      this.listaBrechos = resp
    })
  }
  cadastrarBrecho(){
    this.brechoService.post(this.brecho).subscribe((resp: Brecho)=>{
      this.brecho = resp
      alert('Parceiro Cadastrado com sucesso')
      this.brecho=new Brecho
      this.getAllBrechos()
    }, erro => {
      alert("Preencha os campos do parceiro corretamente!")
    })
  }
  atualizarBrecho(){
    this.brechoService.put(this.brechoModal).subscribe((resp: Brecho)=>{
      this.brechoModal = resp
      alert('Parceiro Atualizado com sucesso')
      this.brechoModal = <Brecho> ({
        id:0,
        nome:'',
        descricao:'',
        fotoPerfil:'',
        fotoCapa:''
      })

      this.getAllBrechos()
    }, erro => {
      alert("Preencha os campos do parceiro corretamente!")
    })
  }
  deletarBrecho(){

    this.brechoService.deleteBrecho(this.brechoModal.id).subscribe(()=>{

      alert('Parceiro apagado com sucesso')

      this.brechoModal = <Brecho> ({
        id:0,
        nome:'',
        descricao:'',
        fotoPerfil:'',
        fotoCapa:''
      })

      this.getAllBrechos()
    })

  }
  setBrechoModal(id: number){
    this.brechoService.getById(id).subscribe((resp: Brecho)=>{
      this.brechoModal = resp
    })
  }

// CRUD CATEGORIAS

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategorias=resp
    })
  }
  cadastrarCategoria(){
    this.categoriaService.postCategoria(this.categoria).subscribe((resp:Categoria)=>{
        this.categoria=resp
        alert("Categoria Cadastrada com sucesso")
        this.categoria=new Categoria
        this.getAllCategorias()
    }, erro => {
      alert("")
    })
  }
  atualizarCategoria(){
    this.categoriaService.putCategoria(this.categoriaModal).subscribe((resp: Categoria)=>{
      this.categoriaModal = resp
      alert('Categoria Atualizada com sucesso')
      this.categoriaModal = <Categoria> ({
        id:0,
        nome:''
      })

      this.getAllCategorias()
    })
  }
  setCategoriaModal(id:number){
    this.categoriaService.getById(id).subscribe((resp:Categoria)=>{
      this.categoriaModal=resp
    })
  }
  deletarCategoria(){
    this.categoriaService.deleteCategoria(this.categoriaModal.id).subscribe(()=>{

      alert('Categoria apagada com sucesso')
      this.categoriaModal = <Categoria> ({
        id:0,
        nome:''
      })
      this.getAllCategorias()
    })
  }

// CRUD PRODUTOS
findByIdBrecho(){
  this.brechoService.getById(this.idBrecho).subscribe((resp: Brecho) => {
    this.brechoProduto = resp
  })
}
findByIdCategoria(){
  this.categoriaService.getById(this.idCategoria).subscribe((resp: Categoria)=>{
    this.categoriaProduto = resp
  })
}

cadastrarProduto(){
  this.produto.brecho = this.brechoProduto
  this.produto.tamanho = "p"
  this.produto.categoria = this.categoriaProduto

  this.produtoService.postProduto(this.produto).subscribe((resp:Produto)=>{
    alert('Produto cadastrado com sucesso');
    this.produto = new Produto()
  })
}

listaProdutosBrecho(){
  this.produtoService.getByIdBrechoProdutos( this.idListaBrecho).subscribe((resp:Produto[])=>{
    this.listaProdutos=resp
  })
}



}
