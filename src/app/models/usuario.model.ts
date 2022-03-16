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
    
}