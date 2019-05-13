import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  RegistroForm: FormGroup;
  constructor(private data : DataManagerService, private formBuilder: FormBuilder) { 
    this.RegistroForm = formBuilder.group({
      rut: [''],
      nombre: [''],
      apellido: [''],
      correo: [''],
      direccion: [''],
      nombreUsuario: [''],
      contrasegna: [''],
      telefono: [''],
      carrera: ['']
    });
  }

  ngOnInit() {
  }

  Registrar() {
    console.log('Registrado');
  }

}
