import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';

const base_url=environment.base_url_api;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  public usuario!:Usuario;

  constructor(private usuarioService:UsuarioService) {
    this.usuario=this.usuarioService.usuario;
   }


   async actualizarFoto(archivo:File,tipo:'usuarios'|'medicos'|'hospitales',idUsuario:string):Promise<any>{
    
      try {
        const url=`${base_url}/uploads/${tipo}/${idUsuario}`;
        //Crear la data que se le va a enviar al back-end
        const formData= new FormData();
        formData.append('imagen',archivo);
        const resp= await fetch(url,{
          method:'PUT',
          headers:{
            'x-token':localStorage.getItem('token') || ''
          },
          body:formData
        })

        
        const dataResp= await resp.json();
        if(dataResp.ok) this.usuarioService.datosInicialesUser(dataResp.usuario);
        return dataResp;

      } catch (error) {
        
        console.log(error)
        return false;
      }

   }

}
