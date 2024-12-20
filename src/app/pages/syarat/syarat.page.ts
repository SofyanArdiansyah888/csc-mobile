import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-syarat',
  templateUrl: './syarat.page.html',
  styleUrls: ['./syarat.page.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class SyaratPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("")
  }

  backClick(){

  }

  doRefresh(avent: any){

  }

}
