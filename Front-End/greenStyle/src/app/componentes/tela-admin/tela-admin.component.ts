import { Component, OnInit } from '@angular/core';
import { Brecho } from 'src/app/Models/Brecho';
import { Categoria } from 'src/app/Models/Categoria';
import { BrechoService } from 'src/app/service/brecho.service';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.css']
})
export class TelaAdminComponent implements OnInit {


  brecho:Brecho = new Brecho



  constructor(
    private brechoService: BrechoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
  }

  cadastrarBrecho(){
    this.brechoService.post(this.brecho).subscribe((resp: Brecho)=>{
      this.brecho = resp
      alert('Parceiro Cadastrado com sucesso')
    })
  }
}
