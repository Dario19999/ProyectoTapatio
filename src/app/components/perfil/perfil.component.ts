import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from "angularx-social-login";
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuarioFB:SocialUser;
  usuario:any = {};

  constructor(private router:Router,
              private usuariosService:UsuariosService) { }

  ngOnInit() {
    this.usuarioFB = JSON.parse(localStorage.getItem("usuario"));
    console.log(this.usuarioFB);

    this.usuariosService.getUsuario(this.usuarioFB.id).subscribe( resultado => this.usuario = resultado[0]);
  }

  verHistorial(){
    this.router.navigate(['historial'])
  }
}
