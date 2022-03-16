import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent  {

  public formSubmitted=false;

  //Se usa el registerForm para tener todos los campos del formulario mapeados y hacer las validaciones
  //correspondientes a cada campo
  public registerForm =this.fb.group({

    nombre:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    password2:['',Validators.required],
    terminos:[false,Validators.required]
  },{
    //tambien se tiene que hacer esta validacion para que el registerForm tenga los cambios actualizados
    validators: [this.passwordsIguales('password','password2'),this.validarCheckTerminos('terminos')]
  });
  
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router ) { }
   
  crearUsuario(){
    this.formSubmitted=true;
    console.log(this.registerForm.value);
    //Imprimir todo el form
    //console.log(this.registerForm);

    //Con este if se valida si todos los campos son correctos, se analizan los validators de la linea 24, dentro
    //del objeto registerForm, despues de dar click en el boton sign Up del formulario.
    if(this.registerForm.valid){ 
      console.log('posteando formulario');
      this.usuarioService.crearUsuario(this.registerForm.value)
          .subscribe({
            next:(resp)=>{
              console.log('usuario creado');
              console.log(resp);
              //Navegar al dashboard
            this.router.navigateByUrl('/');
            }, 
            error:(err)=>{
              Swal.fire('Error',err.error.msg,'error')
            }
          })
  }
    else console.log('Formulario no es correcto')
  }

  //Se valida si hay campos requeridos vacios para mostrar el (*)
  campoNovalido(campo:string):boolean{
   if(this.registerForm.get(campo)?.invalid && this.formSubmitted ) return true;
   else return false; 
  }

  //se valida que las 2 contraseñas sean iguales 
  contrasenasNovalidas(){
    const pass1=this.registerForm.get('password')?.value;
    const pass2=this.registerForm.get('password2')?.value;

    if((pass1!==pass2)&& this.formSubmitted) return true;
    else return false;
  }

  //se verifica si el check esta marcado o no, para mostrar el (*)
  aceptaTerminos(){
    console.log('terminos= '+ this.registerForm.get('terminos')?.value)
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }


  //esta validacion es para que el registerForm tenga actualizado si son iguales o no las contraseña
  //y en base a esa verificacion se crea o no el registro
   
  passwordsIguales(pass1:string,pass2:string){
     
    return (formGroup:FormGroup)=>{
       const pass1Control = formGroup.get(pass1);
       const pass2Control =formGroup.get(pass2);

       if(pass1Control?.value===pass2Control?.value) pass2Control?.setErrors(null);
       else pass2Control?.setErrors({noEsIgual:true});
    }
  }

  //esta validacion es para que el registerForm tenga actualizado si el checkbox esta marcado o no
  //y en base a esa verificacion se crea o no el registro
  validarCheckTerminos(check:string){
    return (formGroup:FormGroup)=>{
      const checkControl = formGroup.get(check);
      if(checkControl?.value) checkControl?.setErrors(null);
      else checkControl?.setErrors({noTieneCheck:true});
   }
  }

}

