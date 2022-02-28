import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private elementoColor= document.getElementById('theme');

  constructor() {

    const url=localStorage.getItem("color")||"./assets/css/colors/default.css"
    this.elementoColor?.setAttribute('href',url)

   }


   changeTheme(color:string, links: NodeListOf<Element>){
   
    /* const href=(elementoColor!.attributes[0].value).split("/").slice(0,4).join("/");
     elementoColor!.attributes[0].value=`${href}/${color}.css`*/
 
     //otra forma
     const url=`./assets/css/colors/${color}.css`
     this.elementoColor?.setAttribute('href',url);
     localStorage.setItem('color',url);
     this.checkCurrentTheme(links);
   }

   checkCurrentTheme(links: NodeListOf<Element>  ){

    links.forEach(elem=>{
      elem.classList.remove('working');
      const btnTheme=elem.getAttribute('data-theme');
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css`;
      const currentTheme=this.elementoColor?.getAttribute('href')
      
      if(btnThemeUrl===currentTheme) elem.classList.add('working')

    })
  }

}
