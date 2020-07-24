import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  @ViewChild('cerrar',{ static: false }) cerrar;

  constructor(public router:Router,
              private authService:SocialAuthService,
              ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(this.user));
      this.loggedIn = (user != null);
    });
  }

  verPerfil(){
    this.router.navigate(['perfil'])
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.cerrar.nativeElement.click();
  }

  logOut(): void {
    this.authService.signOut();
    this.router.navigate(['inicio'])
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
