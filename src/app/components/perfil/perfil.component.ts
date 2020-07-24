import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario:SocialUser;

  constructor(private router:Router) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("user"));
    console.log(this.usuario);
  }

  verHistorial(){
    this.router.navigate(['historial'])
  }
}
