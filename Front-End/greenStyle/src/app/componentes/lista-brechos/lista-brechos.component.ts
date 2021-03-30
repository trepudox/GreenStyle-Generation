import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-brechos',
  templateUrl: './lista-brechos.component.html',
  styleUrls: ['./lista-brechos.component.css']
})
export class ListaBrechosComponent implements OnInit {

  constructor(private router: Router,
     ) { }

  ngOnInit(){
  }

}
