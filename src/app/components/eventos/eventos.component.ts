import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }

  verEvento(){
    this.router.navigate(['evento'])
  }

}
