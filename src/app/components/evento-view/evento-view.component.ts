import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EventosService } from '../../services/eventos.service';
import { ActivatedRoute } from '@angular/router';
import { BoletosService } from '../../services/boletos.service';

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

  imgs:any = null;

  boletos:any = null;

  @ViewChild('cantBoleto') cantBoleto: ElementRef;

  constructor( private activatedRoute:ActivatedRoute,
               private eventosService:EventosService,
               private boletosService:BoletosService
              ) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe( params => {
      this.eventosService.getEvento(params['id']).subscribe( resultado => this.evento = resultado[0]);
      this.eventosService.getImgs(params['id']).subscribe(resultado => this.imgs = resultado);
      this.boletosService.getBoletos(params['id']).subscribe(resultado => this.boletos = resultado)
    })
  }

  agregarCarrito( nombre:string, precio:number, cantidad:number, id:number){
    let carrito = new Array(new Object);

    if(localStorage.getItem("carrito")){

        carrito = JSON.parse(localStorage.getItem("carrito"));

        let ultimaposicion = carrito.length;
        let paso = 1;
        for(let y = 0; y < ultimaposicion ; y++){
            if(carrito[y]['nombre'] == nombre){
                let cant = Number(carrito[y]['cantidad']);
                carrito[y]['cantidad'] = Number(cantidad) + Number(cant);
                paso = 0;
                break;
            }
        }
        if(paso == 1){
            carrito[ultimaposicion] = {};
            carrito[ultimaposicion]['id'] = id;
            carrito[ultimaposicion]['index'] = ultimaposicion;
            carrito[ultimaposicion]['nombre'] = nombre;
            carrito[ultimaposicion]['precio'] = precio;
            carrito[ultimaposicion]['cantidad'] = cantidad;
            carrito[ultimaposicion]['limite'] = 65535;
            carrito[ultimaposicion]['tipo'] = 0;
            carrito[ultimaposicion]['id_promo'] = null;
        }

    }else{
        let ultimaposicion = 0;
        carrito[ultimaposicion]['id'] = id;
        carrito[ultimaposicion]['index'] = ultimaposicion;
        carrito[ultimaposicion]['nombre'] = nombre;
        carrito[ultimaposicion]['precio'] = precio;
        carrito[ultimaposicion]['cantidad'] = cantidad;
        carrito[ultimaposicion]['limite'] = 65535;
        carrito[ultimaposicion]['tipo'] = 0;
        carrito[ultimaposicion]['id_promo'] = null;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.confirm("Agregado al carrito...");
    console.log(carrito);
  }

}
