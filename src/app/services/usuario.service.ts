import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { environment } from '../../environments/environment';
import { tap, map, catchError} from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url_api= environment.base_url_api;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private userSubject = new Subject<Usuario>();
  public userObservable = this.userSubject.asObservable();

  public auth2:any;
  //Se declara una variable pero no se inicializa, la inicializacion se hace dentro del tap de validarToken
  public usuario!:Usuario

  constructor( private http:HttpClient, private router:Router, private ngZone:NgZone ) { 

    //Llamar la instancia de google para inicializarla, en forma de singlenton
    this.googleInit();
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  //Este metodo es llamado en el archivo auth.guard dentro de la carpeta Guards
  validarToken():Observable<boolean>{
   //const token= localStorage.getItem('token') || '';
   return this.http.get(`${base_url_api}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(

      //Nota: el tap sirve se comenta para que que no exista alguna interferencia de ejecuciones, entre este tap
      //y el map que esta comentado en la línea 68, cualquier duda ver seccion 15 video 185 del curso.
     /* tap({
        next:(resp:any)=>{
          console.log(resp);
          //se esta desestructurando la info que viene en la respusta dentro del objeto usuario
          const {email,google,img='',nombre,role,uid}=resp.usuario;
          //Se debe hacer una inicializacion del constructor
          this.usuario=new Usuario(nombre,email,'',role,google,img,uid);
          //si no se hace la inicializacion previa del usuario, da un error al ejecutar el metodo imprimirNombre()
          this.usuario.imprimirNombre();
          localStorage.setItem('token',resp.token)
        }
      })*/
      map((resp:any)=>{
        console.log(resp);
        
        //se esta desestructurando la info que viene en la respusta dentro del objeto usuario
        //nota se le agrega img='' se inicializa vacio para que no de un error cuando se loguea una,
        //persona que no tiene imagen, tambien se podia controlar con un if en el usuario.modelo se verifica,
        //si la imagen es undefined
        const {email,google,img='',nombre,role,uid}=resp.usuario;
        //Se debe hacer una inicializacion del constructor
        this.usuario=new Usuario(nombre,email,'',role,google,img,uid);
        //si no se hace la inicializacion previa del usuario, da un error al ejecutar el metodo imprimirNombre()
        this.usuario.imprimirNombre();
        this.datosInicialesUser(resp.usuario);
        localStorage.setItem('token',resp.token);
        return true
      }
    ),
      /*map(resp=>true),*/
      catchError(err=> of(false))
    );
  }

  crearUsuario(formData:RegisterForm){
    console.log('Creando Usuario');
    return this.http.post(`${base_url_api}/usuarios`,formData)
                    .pipe(
                      tap({
                        //el next si todo sale bien
                        next:(resp:any)=>{
                          console.log(resp);
                          //SE almacena el Token asociado a un usuario en el localStorage
                          localStorage.setItem('token',resp.token)
                      },
                        //si hay un error
                        error:(err)=>{console.log(err)}
                      })
                    )
  }


  actualizarUsuario(data:{email:string,nombre:string,role:string}){
  
  data={
    ...data,
    role:this.usuario.role || ''
  }
   return this.http.put(`${base_url_api}/usuarios/${this.uid}`,data,{
    headers:{
      'x-token':this.token
    }
   }).pipe(
     tap((resp:any)=>{
       this.datosInicialesUser(resp.usuario)
     })
   )
  }


  datosInicialesUser(user: Usuario) {
    console.log(user);
    const { email, google, nombre, role, img = '', uid } = user;
    this.usuario = new Usuario(nombre, email, '', role, google, img, uid,);
    this.userSubject.next((this.usuario));
    console.log(this.usuario);
  }


  googleInit(){

    return new Promise(resolve=>{

      console.log('google init')

      gapi.load('auth2',()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '913273267718-vb0etav37o27iv1nhpa46mf29tgah4kv.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        //con el resolve exponemos toda la funcion gapi.load de la linea 68 y pasamos la variable auth2 por parametro
        resolve(this.auth2);

      });
    })

   
  }

  login(formData:LoginForm){
    return this.http.post(`${base_url_api}/login`,formData)
                    .pipe(
                     tap({
                       //el next si todo sale bien
                       next:(resp:any)=>{
                         console.log(resp);
                         //SE almacena el Token asociado a un usuario en el localStorage
                         localStorage.setItem('token',resp.token)
                      },
                       //si hay un error
                       error:(err)=>{console.log(err)}
                     })
                    )
  }


  loginGoogle(token:string){
    //el token se envia como objeto, que el backend esta esperando un objeto
    return this.http.post(`${base_url_api}/login/google`,{token})
                    .pipe(
                     tap({
                       //el next si todo sale bien
                       next:(resp:any)=>{
                         console.log(resp);
                         //SE almacena el Token asociado a un usuario en el localStorage
                         localStorage.setItem('token',resp.token)
                      },
                       //si hay un error
                       error:(err)=>{console.log(err)}
                     })
                    )
  }

  logOut(){
    localStorage.removeItem('token');

    //esto es para que salga la ventana de escoger la sesion de google con la que estamos logueados el
    //navegador o ingresar con otra cuenta de google
    //en otras palabras permite eliminar la asociación entre su aplicación y la cuenta de un usuario
    gapi.auth2.getAuthInstance().disconnect();

    //Cerrar la session de google
    this.auth2.signOut().then(()=>{
    //aqui le decimos con el ngZone.run() que la navegacion viene de la libreria de angular y no de google
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    })

    


  }

}
