import { Component, OnInit } from '@angular/core';
import { faTshirt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  iconeCamisa = faTshirt

  constructor() { }

  ngOnInit(){
    window.scroll(0, 0)
  }

}
