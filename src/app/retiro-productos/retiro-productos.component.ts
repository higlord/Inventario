import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-retiro-productos',
  templateUrl: './retiro-productos.component.html',
  styleUrls: ['./retiro-productos.component.css']
})
export class RetiroProductosComponent implements OnInit {

  Productos = [];
  constructor(private data : DataManagerService, private router:Router) { }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos()
  {
    this.Productos = this.data.ObtenerProductos();
  }
}
