import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-compra-info',
  templateUrl: './compra-info.component.html'
})
export class CompraInfoComponent implements OnInit {

  elementosVenta:any = null;
  id_evento:number = null;

  constructor(private usuariosService:UsuariosService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id_evento = params['id']
      this.usuariosService.elementosVenta(params['id']).subscribe(resultado => {
        this.elementosVenta = resultado;
        console.log(this.elementosVenta);
      });
    });
  }

}
