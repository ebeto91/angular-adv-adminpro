import { Component, OnInit, ElementRef, Input, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {

  public formSubmitted=false;
  public auth2:any;
  

  @ViewChild('checkremember') checkInput!:ElementRef<HTMLInputElement>;

  //Se usa el registerForm para tener todos los campos del formulario mapeados y hacer las validaciones
  //correspondientes a cada campo
  public loginForm =this.fb.group({
    email:[localStorage.getItem('remember')||'',[Validators.required,Validators.email]],
    password:['',Validators.required],
    remember:[false]
  },{
    //tambien se tiene que hacer esta validacion para que el registerForm tenga los cambios actualizados
    validators: [this.validarFormatoEmail('email')]
  });

  constructor(private router:Router,private fb:FormBuilder, private usuarioService:UsuarioService, private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
    console.log(this.loginForm.value)
  }

  ngAfterViewInit() {
    if (localStorage.getItem('remember') !== null){
       this.checkInput.nativeElement.checked=true;
    }
   
  }

  login(){
    console.log(this.loginForm.value)
    this.usuarioService.login(this.loginForm.value)
        .subscribe({
          next:(resp)=>{
           console.log(resp)
           if(this.loginForm.get('remember')?.value){
             localStorage.setItem('remember', this.loginForm.get('email')?.value);
           }else{
             localStorage.removeItem('remember');
           }
            //Navegar al dashboard
            this.router.navigateByUrl('/');
          },
          error:(err:any)=>{

           

           //se ejecuta si hay campos vacios o lo 2 campos son vacios
           if(err.status===400){
              if(Number(err.error.totalerror)===2) Swal.fire('Error','La Contraseña e Email son obligatorios','error');
              else{
                if(err.error.errors.email)Swal.fire('Error',err.error.errors.email.msg,'error');
                else Swal.fire('Error',err.error.errors.password.msg,'error');
              }
            }
           //se ejecuta si las credenciales no son validas
           else if(err.status===401){
              Swal.fire('Error',err.error.msg,'error');
           }
           else{
            Swal.fire('Error','Actualmente el servidor esta fuera de servicio','error');
           }
           
          }
        })
    //this.router.navigateByUrl('/')
  }

  hacerLogin(){
  
   
    this.formSubmitted=true;
    console.log(this.loginForm.get('email'));
    if(this.loginForm.valid){
      console.log('Haciendo Login Normal no el de Google');
      this.login();
    }
    else{
      console.log('Campos vacios'); 
    } 
  }

   //Se valida si hay campos requeridos vacios para mostrar el (*)
   campoNovalido(campo:string):boolean{
    if(this.loginForm.get(campo)?.invalid && this.formSubmitted && this.loginForm.get(campo)?.value === '') return true;
    else return false; 
   }


   //Mostrar el error email con formato invalido
   muestraErrorFormatoEmail():boolean{
    
    if(this.loginForm.get('email')?.errors && this.formSubmitted && this.loginForm.get('email')?.value !== '') return true;
    else return false
   
   }


   //Validar que el campo email sea correcto

   validarFormatoEmail(email:string){
    return (formGroup:FormGroup)=>{
      const emailControl = formGroup.get(email);
      if(emailControl?.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) emailControl?.setErrors(null);
      else emailControl?.setErrors({invalidEmail:true});
   }
  }




/****************INICIO BLOQUE DE LOGIN CON GOOGLE******************* */

  //Opciones que va a tener el boton de google
renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark'
  });
 
  this.startApp();
}

//aqui inicializamos el googleInit y la variable auth2 que la retorna la promesa
async startApp(){
  this.auth2=await this.usuarioService.googleInit();
  this.attachSignin(document.getElementById('my-signin2'));

}



//Aqui se obtiene la data del usuario al loguearse con la cuenta de google, name, token que genera google,
//etc
attachSignin(element:any) {
  console.log(element.id);
  this.auth2.attachClickHandler(element, {},
      (googleUser:any) =>{
        let id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token)
                           .subscribe({
                             next:(resp)=>{
                              this.ngZone.run(()=>{
                                  //Navegar al dashboard
                             this.router.navigateByUrl('/');
                              })
                            
                             },
                             error:(err)=>{
                               console.log(err);
                               if(err.name === 'HttpErrorResponse'){
                               Swal.fire('Error','Actualmente el Servidor esta fuera de servicio','error');
                               }else{
                                Swal.fire('Error',err.error.msg,'error');
                               }
                               
                             }
                           })
        console.log(id_token);
      }, (error:any)=> {
        alert(JSON.stringify(error, undefined, 2));
      });
}

/****************FIN BLOQUE DE LOGIN CON GOOGLE******************* */


}
