import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-ingresar-prestamo',
  templateUrl: './ingresar-prestamo.component.html',
  styleUrls: ['./ingresar-prestamo.component.css']
})
export class IngresarPrestamoComponent implements OnInit {

  
  Productos = [];
  ProductosPrestamos = [];
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

  ///Funcion que carga los productos desde la base de datos
  CargarProductos()
  {
    this.Productos = this.data.ObtenerProductos();
  }

  ///Funcion que agrega 1 producto que llega por parametros a la lista de productos del inventario
  ///Y la elimina de la lista de productos del pedido (No lo agrega a la base de datos)
  AgregarProducto(Producto) {
    this.Productos.push(Producto);
    this.EliminarProductoPedido(Producto);
  }

  ///Funcion que agrega 1 producto que llega por parametros a la lista de productos a prestar
  //Y la elimina de la lista de productos del inventario
  AgregarProductoPedido(Producto) {
    this.ProductosPrestamos.push(Producto);
    this.EliminarProducto(Producto);
  }

  ///Con indexOf consigue el index del producto que llega por parametros y con el .splice lo elimina 
  ///de la lista de productos para el pedido
  EliminarProductoPedido(Producto) {
    this.ProductosPrestamos.splice(this.ProductosPrestamos.indexOf(Producto), 1);
  }

  ///Con indexOf consigue el index del producto que llega por parametros y con el .splice lo elimina
  ///de la lista de productos del inventario (No lo elimina de la base de datos)
  EliminarProducto(Producto) {
    this.Productos.splice(this.Productos.indexOf(Producto), 1);
  }


  ///Ingresa el prestamo a la base de datos
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
