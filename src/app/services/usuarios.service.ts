import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = "https://proyectotapatio.com/PT-API-P/usuarios/";
  // url = "http://localhost:8080/PT-API/usuarios/";

  constructor(private http:HttpClient) { }

  registrarUsuario( usuario:any ){
    const USUARIO_FD = serialize(usuario);
    return this.http.post(`${this.url}registrarUsuario.php`, USUARIO_FD).pipe(retry(3))
  }

  terminarRegistro( datos:any ){
    const DATOS_REG = serialize(datos);
    return this.http.post(`${this.url}terminarRegistro.php`, DATOS_REG).pipe(retry(3))
  }

  consultaTipoUsuario( id:string ){
    return this.http.get(`${this.url}consultaUsuario.php?id=${id}`).pipe(retry(3))
  }

  getUsuario(id_fb:string){
    return this.http.get(`${this.url}getUsuario.php?id=${id_fb}`).pipe(retry(3))
  }
}
