import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  test!:string
  constructor() { }

  ngOnInit(): void {
    // this.test=`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae culpa delectus recusandae quas reiciendis velit, praesentium numquam fugiat tenetur animi blanditiis cupiditate doloribus ea dicta voluptas neque nesciunt tempore sint!
    // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae culpa delectus recusandae quas reiciendis velit, praesentium numquam fugiat tenetur animi blanditiis cupiditate doloribus ea dicta voluptas neque nesciunt tempore sint!
    // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae culpa delectus recusandae quas reiciendis velit, praesentium numquam fugiat tenetur animi blanditiis cupiditate doloribus ea dicta voluptas neque nesciunt tempore sint!
    // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae culpa delectus recusandae quas reiciendis velit, praesentium numquam fugiat tenetur animi blanditiis cupiditate doloribus ea dicta voluptas neque nesciunt tempore sint!
    // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae culpa delectus recusandae quas reiciendis velit, praesentium numquam fugiat tenetur animi blanditiis cupiditate doloribus ea dicta voluptas neque nesciunt tempore sint!
    // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae culpa delectus recusandae quas reiciendis velit, praesentium numquam fugiat tenetur animi blanditiis cupiditate doloribus ea dicta voluptas neque nesciunt tempore sint!
    // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae culpa delectus recusandae quas reiciendis velit, praesentium numquam fugiat tenetur animi blanditiis cupiditate doloribus ea dicta voluptas neque nesciunt tempore sint!
    // `
  }

  imprime():void{
    if(!this.test) return;
    
    let acumuladorFinal:number=0;

    //los paramaetros en el reduce con el signo de ? son opcionales
    this.test.split('').reduce((acumulador, letra,indexActual?,array?) => {
      if(['a','e','i','o','u'].includes(letra)) return acumuladorFinal= acumulador+1
      return acumuladorFinal
    },0);

    console.log(acumuladorFinal);
   
}
}