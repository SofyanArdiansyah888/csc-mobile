import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController, NavParams} from '@ionic/angular';
import { VenueEntity } from '../../entities/Venue.entity';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-kebijakan',
  templateUrl: './kebijakan.page.html',
  styleUrls: ['./kebijakan.page.scss'],
  imports: [
    IonicModule,
    NgOptimizedImage
  ],
  standalone: true
})
export class KebijakanPage {
  // venue: VenueEntity;
  constructor(navParams: NavParams,private modalController: ModalController) {
    // this.venue = navParams.data?.venue;
   }



  doRefresh(avent: any){

  }

  backClick(){
    this.modalController.dismiss();
  }

}
