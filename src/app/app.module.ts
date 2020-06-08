import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EventoViewComponent } from './components/evento-view/evento-view.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PublicacionViewComponent } from './components/publicacion-view/publicacion-view.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/admin-components/dashboard/dashboard.component';
import { HistorialComprasComponent } from './components/historial-compras/historial-compras.component';
import { CompraInfoComponent } from './components/compra-info/compra-info.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    EventosComponent,
    PublicacionesComponent,
    GaleriaComponent,
    NosotrosComponent,
    EventoViewComponent,
    PerfilComponent,
    PublicacionViewComponent,
    DashboardComponent,
    HistorialComprasComponent,
    CompraInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
