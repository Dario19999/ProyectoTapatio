import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable()
export class VentasService {

  // url = "https://proyectotapatio.com/PT-API-P/ventas/";
  url = "http://localhost:8080/PT-API/ventas/";

  constructor(private http:HttpClient) { }

  crearVenta( venta:any, id_usuario:number ){
    return this.http.post(`${this.url}insertarVenta.php?id_usuario=${id_usuario}`, JSON.stringify(venta)).pipe(retry(3))
  }

  aplicarPromoCodigo( codigo:string ){
    return this.http.get(`${this.url}aplicarPromoCodigo.php?codigo=${codigo}`).pipe(retry(3))
  }

  aplicarPromoRelacionado( codigo:number, id_usuario:number, venta:any ){
    return this.http.post(`${this.url}aplicarPromoRelacionado.php?id_usuario=${id_usuario}&codigo=${codigo}`, JSON.stringify(venta)).pipe(retry(3))
  }

  pagoTienda( total:number, fecha:Date, usuario:any ){
    let USUARIO = serialize(usuario);
    return this.http.post(`${this.url}realizarPagoTienda.php?total=${total}&fecha=${fecha}`, USUARIO).pipe(retry(3))
  }
}