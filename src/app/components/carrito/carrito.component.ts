import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {

  vacioMsg:string = null;
  vacio:boolean = null;
  carrito:any = null;
  precioTotal:number = null;

  loggedIn:boolean = false;

  constructor(private router:Router,
              private usuariosService:UsuariosService) { }

  ngOnInit() {
    this.carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(this.loggedIn);
    if( localStorage.getItem("carrito") && this.carrito.length != 0 ) {

      this.vacio = false;
      let subtotal = 0

      for(let x = 0; x < this.carrito.length; x++){
        subtotal = this.carrito[x]['cantidad'] * this.carrito[x]['precio'];
        this.precioTotal += subtotal;
      }

    }else{
        this.vacio = true;
    }
    console.log(this.carrito);
  }

  modificarCarrito( i:number, cant:number, op:number ){
    console.log(i);
    this.carrito = JSON.parse(localStorage.getItem("carrito"));

    for(let x = 0; x < this.carrito.length; x++){
      if(this.carrito[x]['index'] == i){
        this.carrito[x]['cantidad'] = cant;

        if(op == 1){
          this.precioTotal = this.precioTotal + Number(this.carrito[x]['precio']);
        }
        else if(op == 0){
          this.precioTotal = this.precioTotal - Number(this.carrito[x]['precio']);
        }
      }
    }

    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  eliminarBoleto( i:number ){
    this.carrito = JSON.parse(localStorage.getItem("carrito"));
    this.carrito.splice(i,1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    if(this.carrito.length != 0) {
      let subtotal = 0

      this.vacio = false;

      for(let x = 0; x < this.carrito.length; x++){
        subtotal = this.carrito[x]['cantidad'] * this.carrito[x]['precio'];
        this.precioTotal += subtotal;
      }
    }
    else{
      this.vacio = true;

    }
  }

  irACompra(){
    this.loggedIn = this.usuariosService.getEstadoSesion();

    if(this.loggedIn == true){
      this.router.navigate(['compra']);
    }
    else{
      window.confirm("No puede realizar compras si no ha iniciado sesión");
    }
  }
}
