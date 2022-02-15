import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, Color} from 'chart.js';
import { Grafica } from '../../interfaces/grafica';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

 dataGrafica1:Grafica=
  {
  titulo:"Ventas",
  encabezado:[ "Download Sales", "In-Store Sales", "Mail-Order Sales" ],
  data:[ 300, 200, 50 ],
  colores:['#9E120E','#FF5800','#FFB414']
  }

  dataGrafica2:Grafica=
  {
  titulo:"Finanzas",
  encabezado:[ "I SEMESTRE", "II SEMESTRE", "III SEMESTRE" ],
  data:[ 50, 50, 50 ],
  colores:['red','green','orange']
  }

  dataGrafica3:Grafica=
  {
  titulo:"Compras",
  encabezado:[ "Compras I SEMESTRE", "Compras II SEMESTRE", "Compras III SEMESTRE" ],
  data:[ 600, 800, 50 ],
  colores:['purple','pink','blue']
  }






 
  

  constructor() { }

  ngOnInit(): void {
  }

}
