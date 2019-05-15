import { Injectable } from '@angular/core';
import { ngDevModeResetPerfCounters } from '@angular/core/src/render3/ng_dev_mode';
import { element } from '@angular/core/src/render3';


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  Productos = [
                {id:1, nombre:'Balon Futbol', total:10, disponible:7, prestado:3, lugarRetiro: 'Pañol'},
                {id:2, nombre:'Balon Basketbol', total:8, disponible:7, prestado:1, lugarRetiro: 'Pañol'},
                {id:3, nombre:'Raqueta Ping-Pong', total:20, disponible:12, prestado:8, lugarRetiro: 'Pañol'}
              ];
  Prestamos = [];
  Alumnos = [
              {rut: '19845227-0', nombre: 'Ignacio', apellido: 'Donoso', correo: 'naxonicolas1997@gmail.com'}
            ];
  tempProducto = {};
  
  //user = null;
  user = {
    rut: "19845227-0",
    nombre: "Ignacio",
    apellido: "Donoso",
    correo: "correo",
    username: "iDonosof",
    password: "asd123asd"
  };

  constructor() { }

  ///Productos
  ObtenerProductos()
  {
    return this.Productos;
  }

  AgregarProducto(producto)
  {
    let id = this.Productos.length;
    let tempProd = {
      id: id+1,
      nombre: producto.nombre,
      total: producto.total,
      disponible: producto.total,
      prestado: 0,
      lugarRetiro: ''
      }
    this.Productos.push(tempProd);
  }

  ObtenerProducto(id)
  {
    return this.Productos.filter( p => 
    {
      return p.id == id;
    });
  }

  EditarProducto(producto)
  {
    for(let i in this.Productos)
    {
      if(this.Productos[i].id == producto.Id)
      {
        this.Productos[i].nombre == producto.nomnre;
        this.Productos[i].total == producto.total;
        this.Productos[i].disponible == producto.disponible;
        this.Productos[i].prestado == producto.prestado;
      }
    }
  }

  DevolverProducto(producto)
  {
    for(let i in this.Productos)
    {
      if(this.Productos[i].id == producto.Id)
      {        
        
      }
    }
  }

  PrestarProducto(producto)
  {
    for(let i in this.Productos)
    {
      if(this.Productos[i].id == producto.Id)
      {
        
      }
    }
  }

  QuitarProducto(id)
  {
    let temp = this.Productos.map(p => 
    {
      if (p.id == id)
      {
        return p;
      }
    })
    let index = this.Productos.indexOf(temp[0]);
    this.Productos.splice(index, 1);
  }
  ///Fin productos

  ///Prestamos
  AgregarPrestamo (Prestamo)
  {
    this.Prestamos.push(Prestamo);
  }

  ObtenerPrestamos()
  {
    return this.Prestamos;
  }

  CargarTemporal(producto)
  {
    this.tempProducto = producto;
    console.log(this.tempProducto);
  }
  ///Fin prestamos

  ///Alumnos
  AgregarAlumno (Alumno) {
    this.Alumnos.push(Alumno);
  }

  ObtenerAlumno (rut) {
    return this.Alumnos.filter( p => 
    {
      return p.rut == rut;
    });
  }
  ///Fin alumnos
}
