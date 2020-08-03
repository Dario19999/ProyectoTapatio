import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  irACompra(){
    this.router.navigate(['compra']);
  }



}
