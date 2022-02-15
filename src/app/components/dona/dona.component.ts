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

  @Input() datosGrafica!:Grafica
 
 
    // Doughnut
    @Input('labels') doughnutChartLabels: string[]=['Label1','Label2','Label3'];
    public doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [],
         backgroundColor:[]
       },
      ]
    };
    public doughnutChartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit(): void {
    //this.doughnutChartData.datasets[0].data=this.data.data
  }


  pintaGrafico(datos:Grafica){
    this.doughnutChartData = {
      labels: datos.encabezado,
      datasets: [
        { data: datos.data,
        backgroundColor:datos.colores}
      ],
    };

 }
  


  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      let chng = changes[propName];
      let cur = chng.currentValue;
      let prev = JSON.stringify(chng.previousValue);
      if(cur != undefined)this.pintaGrafico(cur)

    }

    //Esto sirve tambie
    /*if( changes['datosGrafica1'] && changes['datosGrafica1'].previousValue != changes['datosGrafica1'].currentValue ) {
      let cur:Grafica = changes['datosGrafica1'].currentValue;
      if(cur != undefined)this.pintaGrafico(cur)     
    }*/
    
  }

/*
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = chng.currentValue;
      let prev = JSON.stringify(chng.previousValue);
      if(cur != undefined){
        this.data=cur
        this.doughnutChartLabels=this.data.encabezado
        this.doughnutChartData.datasets[0].backgroundColor=this.data.colores
        this.doughnutChartData.datasets[0].data=this.data.data
     }
      
    }
  }
*/
}
