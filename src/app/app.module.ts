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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    EventosComponent,
    PublicacionesComponent,
    GaleriaComponent,
    NosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
