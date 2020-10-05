import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ProyectoTapatio';

  ngOnInit(): void {
    if (environment.production) {
      if (location.protocol === 'http:') {
        // NO SE DEBERÍA HACER
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }


}
