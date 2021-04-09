import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { AlertasService } from 'src/app/service/alertas.service';
import { BrechoService } from 'src/app/service/brecho.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.css']
})
export class TelaAdminComponent implements OnInit {

  idBrecho:number

  brecho:Brecho = new Brecho
  listaBrechos:Brecho[]
  brechoModal = new Brecho

  categoria:Categoria = new Categoria
  listaCategorias:Categoria[]
  categoriaModal = new Categoria

  constructor(
    private brechoService: BrechoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    this.verificaUser()
  }

  verificaUser(){
    if(environment.token==''){
      this.alertas.showAlertInfo('AVISO: VOCÊ NÃO ESTA LOGADO, POR GENTILEZA LOGUE COMO ADM PARA TER ACESSO Á ESTE SERVIÇO')
      this.router.navigate(['/home'])
    }
    else if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo('AVISO: VOCÊ NÃO É UM ADM, POR GENTILEZA LOGUE COMO ADM PARA TER ACESSO Á ESTE SERVIÇO')
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
      this.alertas.showAlertSuccess('Parceiro Cadastrado com sucesso')
      this.brecho=new Brecho
      this.getAllBrechos()
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

}
findByIdCategoria(){

}



}
