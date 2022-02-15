import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  data:string='';
  @Input() progreso!:number ;

  @ViewChild('procentajeBox') input!:ElementRef<any>;
  @Output() porcentajeEmit:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      
      if(cur==='0') console.log('hola');
    }
  }


  

  



  get getProgreso(){
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number){
  

   if(this.progreso>=100 && valor >=0){
    this.porcentajeEmit.emit(100);
    return this.progreso=100;
   } 
  
   else if(this.progreso<=0 && valor < 0){
    this.porcentajeEmit.emit(0);
   return this.progreso=0;
   }




   this.progreso=this.progreso+valor;
   

   if(this.progreso>100){ 
    this.porcentajeEmit.emit(100);
     return this.progreso=100;
    }
   else if (this.progreso<0){
    this.porcentajeEmit.emit(0);
    return this.progreso=0;
   } 

   this.porcentajeEmit.emit(this.progreso);
   
   return this.progreso;
   
  }
  



  emitOuput(value:string){
 
    if(value.length==2){
        if(value[0]==='0'){
          console.log(this.input.nativeElement.value)
          this.data= value
          this.input.nativeElement.value=this.data.slice(1)
        }
    }
   
  
    if(parseInt(value)>100){
      this.porcentajeEmit.emit(100);
      this.input.nativeElement.value='100';
    }
   
    else if(value === ''){
      this.input.nativeElement.value='';
      this.porcentajeEmit.emit(0);
     
     
    }
    
    else{
      this.progreso=parseInt(value);
      this.porcentajeEmit.emit(this.progreso);
    }
  

/*
    console.log(this.input.nativeElement.value)

    if(this.input.nativeElement.value <= '100' || this.input.nativeElement.value >= '0'){
      this.porcentajeEmit.emit(this.progreso);
    } else{
      if(this.input.nativeElement.value >= '100') this.porcentajeEmit.emit(100);
      else this.porcentajeEmit.emit(0);
    }
   
  }
*/

  }
}
