import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EventosService } from '../../services/eventos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento-view',
  templateUrl: './evento-view.component.html'
})
export class EventoViewComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  evento:any = {};

  constructor( private activatedRoute:ActivatedRoute,
               private eventosService:EventosService
              ) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe( params => {
      this.eventosService.getEvento(params['id']).subscribe( resultado => this.evento = resultado[0])
    })
  }

}
