import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl='';
  public nombre='';
  public usuario!:Usuario;
  constructor(private usuarioService:UsuarioService) { 

    this.imgUrl=usuarioService.usuario.imagenUrl;
    this.nombre=this.usuarioService.usuario.nombreUsuario;
    this.usuario=this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.usuarioService.userObservable.subscribe(res => {
      this.usuario = res;
    })
  }

  logOut(){
    this.usuarioService.logOut();
  }

}
