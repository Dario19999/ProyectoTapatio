import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  usuarioFB: SocialUser;
  loggedIn: boolean;

  formRegistro:FormGroup;

  @ViewChild('cerrar',{ static: false }) cerrar;
  @ViewChild('modalRegistro',{ static: false }) modalRegistro;
  @ViewChild('cerrarModalRegistro',{ static: false }) cerrarModalRegistro;

  constructor(public router:Router,
              private authService:SocialAuthService,
              private usuariosService:UsuariosService,
              private fb:FormBuilder
              ) { }

  ngOnInit() {
    this.formRegistroInit();
    this.authService.authState.subscribe((user) => {
      this.usuarioFB = user;
      this.loggedIn = (user != null);

      localStorage.setItem("usuario", JSON.stringify(this.usuarioFB));
      if(this.loggedIn){
        this.usuariosService.registrarUsuario(this.usuarioFB).subscribe( datos => {
          if(datos['resultado'] == "ERROR"){
            console.log("ERROR");
            return
          }
          else if( datos['resultado'] == "OK"){
            this.cerrar.nativeElement.click();

            let estado = null;
            this.usuariosService.consultaTipoUsuario(this.usuarioFB.id).subscribe( resultado => {
              estado = resultado;
              if(estado[0].tipo_usuario == 0){
                this.modalRegistro.nativeElement.click();
              }
              else if( estado[0].tipo_usuario == 1){
                return
              }
            })
          }
        });
        this.formRegistro.addControl('id', this.fb.control(null));
        this.formRegistro.get('id').setValue(this.usuarioFB.id);
      }

    });
  }

  formRegistroInit(){
    this.formRegistro = this.fb.group({
      correo:[null, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      celular:[null, Validators.required],
      celularExt:[null, Validators.required],
      nacimiento:[null, Validators.required]
    })
  }

  get validacionCorreo(){
    return this.formRegistro.get('correo').invalid && this.formRegistro.get('correo').touched
  }

  get validacionNacimiento(){
    return this.formRegistro.get('nacimiento').invalid && this.formRegistro.get('nacimiento').touched
  }

  get validacionTelefono(){
    return this.formRegistro.get('celular').invalid && this.formRegistro.get('celular').touched
  }

  get validacionTelefonoExtra(){
    return this.formRegistro.get('celularExt').invalid && this.formRegistro.get('celularExt').touched
  }

  get validacionNumero(){
    return this.esAlfa(this.formRegistro.get('celular').value) && this.formRegistro.get('celular').value != ""
  }

  get validacionNumeroExtra(){
    return this.esAlfa(this.formRegistro.get('celularExt').value) && this.formRegistro.get('celularExt').value != ""
  }

  esAlfa(str) {
    if(str != null){
      if (!str.match(/^[0-9]+$/)){
        return true
      }
      else{
        return false
      }
    }
  }

  verPerfil(){
    this.router.navigate(['perfil'])
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.authService.signOut();
    this.router.navigate(['inicio'])
  }

  guardarRegistro(){
    console.log(this.formRegistro.value);
    this.usuariosService.terminarRegistro(this.formRegistro.value).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        window.confirm("Ocurrio un error. Inténtelo más tarde.");
        return
      }
      else if(datos['resultado'] == "OK"){
        window.confirm("Registro completado con éxito.");
        this.cerrarModalRegistro.nativeElement.click();
      }
    })
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
