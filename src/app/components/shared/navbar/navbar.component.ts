import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  verPerfil(){
    this.router.navigate(['perfil'])
  }

  guardar( forma:NgForm){
    console.log(forma);
    if(forma.invalid){
      Object.values(forma.controls).forEach( controls =>{
        controls.markAllAsTouched();
      });
      return;
    }
    console.log(forma.value);
  }
}
