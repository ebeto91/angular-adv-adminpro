import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Grafica } from '../../interfaces/grafica';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  //Aqui capturamos la data que viene del padre
  @Input() datosGrafica!:Grafica
 
 
    // Doughnut
    public doughnutChartData: ChartData<'doughnut'> = {datasets: []};
    public doughnutChartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit(): void {
   //Aqui inicializamos la data para cada grafica.
   this.pintaGrafico(this.datosGrafica)
  }


  //metodo para pintar la grafica con la data.
  pintaGrafico(datos:Grafica){
    this.doughnutChartData = {
      labels: datos.encabezado,
      datasets: [
        { data: datos.data,
        backgroundColor:datos.colores}
      ],
    };

 }
  


  
}
