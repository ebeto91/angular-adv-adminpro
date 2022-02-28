import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [

    `
     .selector{
       cursor:pointer;
     }


    `
  ]
})
export class AccountSettingsComponent implements OnInit {
//  elementoColor= document.getElementById('theme');
  //Primero se declara la variable
  public links!: NodeListOf<Element>;

  constructor(private settingsService:SettingsService) {}

  ngOnInit(): void {

    //aqui se carga la variable links con un valor, con el ngOnInit ya se tiene renderizado el componente
    this.links=document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.links);

  }


  changeTheme(color:string){
   
   /* const href=(elementoColor!.attributes[0].value).split("/").slice(0,4).join("/");
    elementoColor!.attributes[0].value=`${href}/${color}.css`*/

    //otra forma
  /*  const url=`./assets/css/colors/${color}.css`
    this.elementoColor?.setAttribute('href',url);
    localStorage.setItem('color',url);*/

    this.settingsService.changeTheme(color,this.links)
   // this.checkCurrentTheme();
  }

  /*checkCurrentTheme(){



    this.links.forEach(elem=>{
      elem.classList.remove('working');
      const btnTheme=elem.getAttribute('data-theme');
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css`;
      const currentTheme=this.elementoColor?.getAttribute('href')
      
      if(btnThemeUrl===currentTheme) elem.classList.add('working')

    })
  }*/

}
