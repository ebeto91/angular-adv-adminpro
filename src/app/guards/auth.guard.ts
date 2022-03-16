import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    //esto que esta comentado sirve
   /* this.usuarioService.validarToken()
                       .subscribe({
                         next:(resp)=>{
                        console.log(resp);
                         },
                         error:(err)=>{

                         }
                       })*/
                      
    console.log('Paso por el canActivate del guard')
    return this.usuarioService.validarToken()
                              .pipe(
                                tap({
                                  next:(estaAutenticado)=>{
                                   if(!estaAutenticado) this.router.navigateByUrl('/login');
                                  }
                                })
                              );
  }
  
}
