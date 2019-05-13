import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  ///Nombre del usuario que debe llegar desde la base de datos
  ///Cuando el usuario este logeado
  usuario : any;
  constructor(private data : DataManagerService) {
  }

  ngOnInit() {
    this.usuario = this.data.user;
  }
}