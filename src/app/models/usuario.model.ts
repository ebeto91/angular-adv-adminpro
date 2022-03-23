import { environment } from '../../environments/environment';
const base_url=environment.base_url_api;

export class Usuario{

    constructor(

        //nota primero van los requeridos y de ultimo los opcionales

        public nombre:string,
        public email:string,
        public password:string,
        public role?:string,
        public google?:boolean,
        public img?:string,
        //el simbolo ? significa opcional
        public uid?:string
    ){}


    //retornar la imagen para mostrarla en el header y en el sidebar.
    get imagenUrl():string{
        console.log(this.img);
        if(this.img?.includes('https')) return this.img;
        else{
        if(this.img) return `${base_url}/uploads/usuarios/${this.img}`
        else return `${base_url}/uploads/usuarios/noImageDisponible.jpg`
        }
    }

    get nombreUsuario():string{
        return this.nombre;
    }

    imprimirNombre(){
        console.log(this.nombre);
    }
    
}