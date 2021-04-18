import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Brecho } from 'src/app/Models/Brecho';
import { AlertasService } from 'src/app/service/alertas.service';
import { BrechoService } from "src/app/service/brecho.service";
import { environment } from "src/environments/environment.prod"

@Component({
  selector: 'app-lista-brechos',
  templateUrl: './lista-brechos.component.html',
  styleUrls: ['./lista-brechos.component.css']
})
export class ListaBrechosComponent implements OnInit {

  listaBrecho: Brecho[]

  constructor(
    private router: Router,
    private brechoService: BrechoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.setListaBrecho()

  }

  setListaBrecho() {
    this.brechoService.getAll().subscribe((resp: Brecho[]) => {
      this.listaBrecho = resp
    })
  }

  irParaBrecho(id: number) {
    console.log(id)
    this.router.navigate([`/produtos-brecho/${id}`])
  }

  enviarSolicitacao() {
    this.alertasService.showAlertSuccess("Solicitação enviada com sucesso!")
  }

}
