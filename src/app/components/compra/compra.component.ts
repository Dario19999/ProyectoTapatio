import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoletosService } from '../../services/boletos.service';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html'
})
export class CompraComponent implements OnInit {

  formCodigo:FormGroup;
  formReferencia:FormGroup;

  compra:any = null;
  total:any = null;

  @ViewChild('cerrarModalPromo', {static: false}) cerrarModalPromo;

  constructor( private fb:FormBuilder,
               private boletosService:BoletosService) { }

  ngOnInit(): void {
    this.formCodigoInit();
    this.formReferenciaInit();
    this.compra = JSON.parse(localStorage.getItem("carrito"));
    let subtotal = 0

    for(let x = 0; x < this.compra.length; x++){
      subtotal = this.compra[x]['cantidad'] * this.compra[x]['precio'];
      this.total += subtotal;
    }

  }

  formCodigoInit(){
    this.formCodigo = this.fb.group({
      codigo:[null, [Validators.required, Validators.max(10), Validators.min(10)]]
    })
  }

  formReferenciaInit(){
    this.formReferencia = this.fb.group({
      codigoBoleto:[null, Validators.required]
    })
  }

  aplicarPromoCodigo(){
    this.boletosService.aplicarPromoCodigo(this.formCodigo.get('codigo').value).subscribe( datos => {
        if(datos['resultado'] == "ERROR"){
          window.confirm("Ha ocurrido un error inesperado.");
          return
        }
        else if(datos['resultado'] == "OK"){
          if(datos['estado'] == 0){
            window.confirm(datos['mensaje']);
            return
          }
          else if(datos['estado'] == 1){

            let id_promo = datos['id'];
            let id_boleto = datos['boleto'];
            let cantidad_cod = datos['cantidad'];
            let precio_cod = datos['precio'];

            let carrito = JSON.parse(localStorage.getItem('carrito'));

            let cantCarrito = carrito.length;

            let y = 0;

            for(let x = 0; x < cantCarrito; x++){
              if(carrito[x]['id_promo'] == null && carrito[x]['id'] == id_boleto){
                y = 1;

                let cantidad = Number(carrito[x]['cantidad']);
                cantidad = cantidad - Number(cantidad_cod);

                if(cantidad < 0){
                    cantidad = cantidad + Number(cantidad_cod);
                    carrito[x]['precio'] = precio_cod;
                    carrito[x]['cantidad'] = cantidad;
                    carrito[x]['limite'] = cantidad_cod;
                    carrito[x]['tipo'] = 2;
                    carrito[x]['id_promo'] = id_promo;
                }else{
                    //sobrepasa la promocion
                    carrito[x]['cantidad'] = cantidad;
                    carrito[x]['precio'] = precio_cod;
                    carrito[x]['cantidad'] = cantidad_cod;
                    carrito[x]['limite'] = cantidad_cod;
                    carrito[x]['tipo'] = 2;
                    carrito[x]['id_promo'] = id_promo;
                }
                break;
              }
            }
            if(y == 0){
              window.confirm("El código ingresado no aplica para ninguno de sus boletos.");
            }
            this.compra = carrito;
            let subtotal = 0;
            this.total = 0;

            for(let x = 0; x < this.compra.length; x++){
              subtotal = this.compra[x]['cantidad'] * this.compra[x]['precio'];
              this.total += subtotal;
            }

            window.confirm("Promocion aplicada con exito.")
            this.cerrarModalPromo.nativeElement.click();
          }
        }
    })

  }

  guardarPromoeferencia(){

  }

  get codigoValidacion(){
    return this.formCodigo.get('codigo').invalid && this.formCodigo.get('codigo').touched
  }
}
