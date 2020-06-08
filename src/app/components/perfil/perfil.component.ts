import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  verHistorial(){
    this.router.navigate(['historial'])
  }
}
