import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  user : any;
  constructor(private data : DataManagerService) { 

  }

  ngOnInit() {
    this.user = this.data.user;
    console.log(this.user);
  }


}
