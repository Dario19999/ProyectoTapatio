import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  eventos = null;

  formFiltros:FormGroup;

  constructor( private router:Router,
               private eventosService:EventosService,
               private fb:FormBuilder
              ) { }

  ngOnInit() {
    this.getEventos();
    this.formFiltrosInit();
  }

  formFiltrosInit(){
    this.formFiltros = this.fb.group({
      tipo:[''],
      precioMin:[''],
      precioMax:['']
    });
  }

  getEventos(){
    this.eventosService.getEventos().subscribe( resultado => this.eventos = resultado );
  }

  filtrar(){
    this.eventosService.getEventos(this.formFiltros.get('tipo').value).subscribe( resultado => this.eventos = resultado);
  }


  verEvento( id_evento:number ){
    this.router.navigate(['evento', id_evento]);
  }

}
