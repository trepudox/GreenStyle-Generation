import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { AlertasService } from 'src/app/service/alertas.service';
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
  idCategoria2:number
  brechoProduto:Brecho = new Brecho
  categoriaProduto:Categoria = new Categoria
  categoriaProduto2: Categoria = new Categoria
  idListaBrecho:number
  produtoModal= new Produto
  disponibilidadevar:string

  constructor(
    private brechoService: BrechoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private alertas: AlertasService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.verificaUser()
  }

  verificaUser(){
    if(environment.token==''){
      this.router.navigate(['/home'])
       this.alertas.showAlertInfo('AVISO: VOCÊ NÃO ESTA LOGADO, POR GENTILEZA LOGUE COMO ADM PARA TER ACESSO Á ESTE SERVIÇO')

    }
    else if(environment.tipo != 'adm'){
      this.router.navigate(['/home'])
       this.alertas.showAlertInfo('AVISO: VOCÊ NÃO É UM ADM, POR GENTILEZA LOGUE COMO ADM PARA TER ACESSO Á ESTE SERVIÇO')
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
      this.alertas.showAlertSuccess('Parceiro Cadastrado com sucesso')
      this.brecho=new Brecho
      this.getAllBrechos()
    }, erro => {
      this.alertas.showAlertDanger("Preencha os campos do parceiro corretamente!")
    })
  }
  atualizarBrecho(){
    this.brechoService.put(this.brechoModal).subscribe((resp: Brecho)=>{
      this.brechoModal = resp
      this.alertas.showAlertSuccess('Parceiro Atualizado com sucesso')
      this.brechoModal = <Brecho> ({
        id:0,
        nome:'',
        descricao:'',
        fotoPerfil:'',
        fotoCapa:''
      })

      this.getAllBrechos()
    }, erro => {
      this.alertas.showAlertDanger("Preencha os campos do parceiro corretamente!")
    })
  }
  deletarBrecho(){

    this.brechoService.deleteBrecho(this.brechoModal.id).subscribe(()=>{

      this.alertas.showAlertSuccess('Parceiro apagado com sucesso')

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
        this.alertas.showAlertSuccess("Categoria Cadastrada com sucesso")
        this.categoria=new Categoria
        this.getAllCategorias()
    }, erro => {
      alert("")
    })
  }
  atualizarCategoria(){
    this.categoriaService.putCategoria(this.categoriaModal).subscribe((resp: Categoria)=>{
      this.categoriaModal = resp
      this.alertas.showAlertSuccess('Categoria Atualizada com sucesso')
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

      this.alertas.showAlertSuccess('Categoria apagada com sucesso')
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
  findByIdCategoria2(){
    this.categoriaService.getById(this.idCategoria2).subscribe((resp: Categoria)=>{
      this.categoriaProduto2 = resp
    })
  }
  cadastrarProduto(){
    this.produto.brecho = this.brechoProduto
    this.produto.categoria = this.categoriaProduto
    this.disponibilidade()

    this.produtoService.postProduto(this.produto).subscribe(()=>{
      this.alertas.showAlertSuccess('Produto cadastrado com sucesso!');
      this.produto = new Produto()
      this.listaProdutosBrecho()
    })
  }

  atualizarProduto() {
    this.produtoModal.categoria = this.categoriaProduto2
    this.produtoService.putProduto(this.produtoModal).subscribe(() => {
      this.alertas.showAlertSuccess("Produto atualizado com sucesso!")
      this.produtoModal = new Produto()
      this.listaProdutosBrecho()
    })
  }

  deletarProduto() {
    this.produtoService.deleteProduto(this.produtoModal.id).subscribe(() => {
      this.alertas.showAlertSuccess("Produto deletado com sucesso!")
      this.produtoModal = new Produto()
      this.listaProdutosBrecho()
    })
  }

  listaProdutosBrecho(){
    this.produtoService.getByIdBrechoProdutos(this.idListaBrecho).subscribe((resp:Produto[])=>{
      this.listaProdutos=resp
    })
  }
  setProdutoModal(id:number){
    this.produtoService.getByIdProduto(id).subscribe((resp:Produto)=>{
      this.produtoModal=resp
    })
  }
  disponibilidade(){
    this.produto.disponivel = this.disponibilidadevar == "true" ? true : false
  }





}
