import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls:['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progreso1:number = 25
  progreso2:number = 35
  

  get getProgreso1(){
  // console.log(this.progreso1)
  
  if (typeof this.progreso1 === "string") return `${this.progreso1}%`
    
  
   return `${this.progreso1}%`
  }

  get getProgreso2(){
  
    return `${this.progreso2}%`
   }

 
  imprimeOutput(valor:number){
   //console.log(valor);
  }


  constructor() { }

  ngOnInit(): void {
  }

  


}
