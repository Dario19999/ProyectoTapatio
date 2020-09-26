import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html'
})
export class PagoComponent implements OnInit {

  compra:any = null;
  total:number = null;
  usuario:any = null;
  loggedIn:boolean = null;
  respuestaTienda:any = null;

  constructor(private ventasService:VentasService,
              private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(this.usuario);
    this.loggedIn = this.usuariosService.getEstadoSesion();
    this.compra = JSON.parse(localStorage.getItem("compra"));

    let subtotal = 0

    for(let x = 0; x < this.compra.length; x++){
      subtotal = this.compra[x]['cantidad'] * this.compra[x]['precio'];
      this.total += subtotal;
    }
  }

  pagoEnTienda(){
    let fechaPresente = new Date();
    let plazo = fechaPresente.getTime() + (3*24*60*60*1000);
    let fechaLimite = new Date(plazo);

    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    this.ventasService.pagoTienda(this.total, fechaLimite, this.usuario).subscribe(datos => {
      if(datos['resultado'] == "ERROR"){
        window.confirm("Ha ocurrido un error inesperado. Intentelo más tarde.");
        return
      }
      else{
        window.location.href = datos['recibo'];
      }
    })
  }

  registrarVenta( metodo:number ){
    this.ventasService.crearVenta(this.compra, Number(this.usuario['id_usuario'])).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        window.confirm("Ha ocurrido un error inesperado. Intentelo más tarde.");
        return
      }
      else{
        if(datos['estado'] == 0){
          for(let x = 0; x < datos['mensajes'].length; x++){
            window.confirm(datos['mensajes'][x]);
          }
        }
        else{
          if(metodo == 1){
            this.pagoEnTienda();
          }
          else{

          }
        }
      }
    })
  }

}
