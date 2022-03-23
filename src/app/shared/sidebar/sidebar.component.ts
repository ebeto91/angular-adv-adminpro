import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems!:any[];
  public imgUrl='';
  public nombre='';
  public usuario!:Usuario;

  constructor(private sidebarService:SidebarService, private usuarioService:UsuarioService) {
    this.usuario=this.usuarioService.usuario;
    
   }

  ngOnInit(): void {
   this.menuItems=this.sidebarService.menu
   this.imgUrl=this.usuarioService.usuario.imagenUrl;
   this.nombre=this.usuarioService.usuario.nombreUsuario;
   this.usuarioService.userObservable.subscribe(res => {
    this.usuario = res;
  })
   
  }

  logOut(){
    this.usuarioService.logOut();
  }

}
