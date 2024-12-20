import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-coming',
  templateUrl: './coming.page.html',
  styleUrls: ['./coming.page.scss'],
  imports: [
    IonicModule,
    NgOptimizedImage
  ],
  standalone: true
})
export class ComingPage {

  constructor() { }

  backClick(){

  }
  doRefresh(event: any){

  }

}
