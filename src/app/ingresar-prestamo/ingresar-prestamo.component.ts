import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-ingresar-prestamo',
  templateUrl: './ingresar-prestamo.component.html',
  styleUrls: ['./ingresar-prestamo.component.css']
})
export class IngresarPrestamoComponent implements OnInit {

  
  Productos = [];
  ProductosPrestamos = [{id:1, nombre:'Balon Futbol', total:10, disponible:7, prestado:3, lugarRetiro: 'Pañol'}];
  PrestamoForm: FormGroup;
  constructor(private data : DataManagerService, private formBuilder: FormBuilder) 
  {
    this.PrestamoForm = this.formBuilder.group(
      {
        rut: [''],
        nombre: [''],
        apellido: [''],
        correo: ['']
      }
    );
  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos()
  {
    this.Productos = this.data.ObtenerProductos();
  }

  PedirProducto() {
    console.log('Agrega el producto al pedido');
  }

  EliminarProductoPedido() {
    this.ProductosPrestamos = [];
    console.log('Eliminar producto de la lista de pedidos');
  }

  AgregarPrestamo() {
    this.data.AgregarPrestamo(
    {
      id: 1,
      rut: this.PrestamoForm.controls.rut.value,
      producto: this.PrestamoForm.controls.producto.value,
      cantidad: 1,
    });
  }
}
