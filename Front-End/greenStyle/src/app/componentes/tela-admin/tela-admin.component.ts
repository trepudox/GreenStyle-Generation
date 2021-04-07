import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { BrechoService } from 'src/app/service/brecho.service';
import { CategoriaService } from 'src/app/service/categoria.service';
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

  constructor(
    private brechoService: BrechoService,
    private categoriaService: CategoriaService,
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
    })
  }




}
