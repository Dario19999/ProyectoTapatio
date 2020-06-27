import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  eventos = null;

  evento = {
    id_evento:null,
    nombre_evento:null,
    descripcion_evento:null
  }

  constructor( private router:Router,
               private eventosService:EventosService
              ) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.eventosService.getEventos().subscribe( resultado => this.eventos = resultado );
  }

  verEvento(){
    this.router.navigate(['evento'])
  }

}
