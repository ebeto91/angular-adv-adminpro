import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor(private settingsService:SettingsService) { }

  
  ngOnInit(): void {
  
    customInitFunctions();

    /*
    if(localStorage.getItem('color')) this.elementoColor?.setAttribute('href',localStorage.getItem('color')!.toString())
    else {
      const url=localStorage.getItem("color")||"./assets/css/colors/default.css"
   this.elementoColor?.setAttribute('href',url)
    }
  }*/

  /*
  const url=localStorage.getItem("color")||"./assets/css/colors/default.css"
  this.elementoColor?.setAttribute('href',url)*/

  }

}
