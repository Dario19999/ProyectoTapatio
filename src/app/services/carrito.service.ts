import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  // url = "https://proyectotapatio.com/PT-API-P/carrito/";
  url = "http://localhost:8080/PT-API/carrito/";

  constructor( private http:HttpClient) { }

  crearCarrito( id:number, nombre:string, precio:number, cantidad:number){
    return this.http.get(`${this.url}crearCarrito.php?id=${id}&nombre=${nombre}&precio=${precio}&cantidad=${cantidad}`).pipe(retry(3))
  }
}
