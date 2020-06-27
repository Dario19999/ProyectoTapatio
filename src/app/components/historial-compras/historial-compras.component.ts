import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html'
})
export class HistorialComprasComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  verCompra(){
    this.router.navigate(['info-compra'])
  }

}
