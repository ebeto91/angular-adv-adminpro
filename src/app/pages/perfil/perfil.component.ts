import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File | null;
  public imgTemp:any=null;
  public imgFinalSubida!:any;

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, 
    private fileUploadService:FileUploadService) {
    this.usuario=usuarioService.usuario;
   }

  ngOnInit(): void {

    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]]
     
    });

    this.usuarioService.userObservable.subscribe(res => {
      console.log(res);
      this.usuario = res;
    })

  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
                      .subscribe({
                        next:(resp:any)=>{
              //esto se hace para ver reflejado el cambio en la variables, si no se usan observables.
                        /* const {nombre,email}=this.perfilForm.value;
                          this.usuario.nombre=nombre;
                          this.usuario.email=email;*/
                         Swal.fire('Guardado','Los cambios fueron Guardados','success');

                          
                        },
                        error:(err)=>{
                          Swal.fire('Error',err.error.msg,'error');
                          this.perfilForm.controls['email'].setValue(this.usuario.email);
                        }
                      })
  }
  

  //para actualizar la imagen, es decir llamar el servicio para comunicarse con el back-end
  subirImagen(){
  this.fileUploadService.actualizarFoto(this.imagenSubir!,'usuarios',this.usuario.uid!)
      .then(obj=>{
        if(obj.ok){ 
          console.log(obj.nombreArchivo);
          //Esto esta bien linea 64 solo que estoy imlementando el observable en la linea 32 y servicio file
         // this.usuario.img=obj.nombreArchivo;
          this.imgFinalSubida.value=null;
          this.imagenSubir = null;
          Swal.fire('Imagen Publicada','Imagen Agregada Exitosamente','success');
          

      }
        else Swal.fire('Error al Publicar La Imagen',obj.msg,'error');
      }).catch(err=>{
        console.log(err);
      })
  }





  test(e:any){
    if(this.imgTemp){
      this.imgTemp=null;
    }
  
  }

  //este metodo es para captura u obtener la imagen
cambiarImagen(e:any):any{
  const extensionesValidas:string[]=['png','jpg','jpeg','gif'];
  
 

  if(!e.target.files[0]){
    console.log('entro');
    return this.imgTemp=undefined;
  }else{
    
      const extensionImagen:string = e.target.files[0].type;

      //Se valida la extension es permitida
      if(!extensionesValidas.includes(extensionImagen.split('/')[1])){
        e.target.value=null;
        this.imagenSubir = null;
        console.log(e.target);
        Swal.fire('Error','La foto selecionada no tiene una extension permitida','error');
        return this.imgTemp=undefined; 
      }
      
      //Si la extension es correcta sigue lo siguiente.

      this.imagenSubir=e.target.files[0];
      this.imgFinalSubida=e.target;
     
      //*********************Codigo vista previa imagen***********************
      const reader = new FileReader();
      

      //Link Interes: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL

      /*The readAsDataURL method is used to read the contents of the specified Blob or File.
      When the read operation is finished, the readyState becomes DONE , and the loadend is triggered. 
      At that time, the result attribute contains the data as a data: URL representing 
      the file's data as a base64 encoded string*/

      reader.readAsDataURL(e.target.files[0]);
      //const url64=reader.readAsDataURL(e.target.files[0]);

      reader.onloadend=()=>{

        //El reader.result=> tiene la urlEnBase64.
        this.imgTemp=reader.result;
        console.log(reader.result);
        //*********************Fin codigo vista previa imagen.**************************
      }
    }
  }

}
