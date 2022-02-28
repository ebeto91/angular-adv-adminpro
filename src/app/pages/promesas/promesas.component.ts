import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promesa=new Promise((resolve)=>{
      resolve(console.log('hola'))
    })


    promesa.then(()=>{
      console.log('termine')
    })

    console.log('fin')

  }

  

}
