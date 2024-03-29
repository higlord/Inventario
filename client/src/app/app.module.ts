import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MatButtonModule, MatDialogModule } from '@angular/material';

import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { NavComponent } from './nav/nav.component';
import { IngresarStockComponent } from './ingresar-stock/ingresar-stock.component';
import { SacarStockComponent } from './sacar-stock/sacar-stock.component';
import { IngresarPrestamoComponent } from './ingresar-prestamo/ingresar-prestamo.component';
import { IngresarDevolucionComponent } from './ingresar-devolucion/ingresar-devolucion.component';
import { LoginComponent } from './login/login.component';
import { VerPrestamoComponent } from './ver-prestamo/ver-prestamo.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RetiroProductosComponent } from './retiro-productos/retiro-productos.component';
import { RegistroComponent } from './registro/registro.component';
import { PopupComponent } from './popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarProductoComponent,
    VerProductoComponent,
    NavComponent,
    IngresarStockComponent,
    SacarStockComponent,
    IngresarPrestamoComponent,
    IngresarDevolucionComponent,
    LoginComponent,
    VerPrestamoComponent,
    PerfilUsuarioComponent,
    RetiroProductosComponent,
    RegistroComponent,
    PopupComponent,
    ActualizarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [PopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
