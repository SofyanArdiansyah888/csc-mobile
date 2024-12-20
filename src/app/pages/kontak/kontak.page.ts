import {Component} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.page.html',
  styleUrls: ['./kontak.page.scss'],
  imports: [
    IonicModule
  ],

  standalone: true
})
export class KontakPage {

  constructor(private modalController: ModalController) {
  }


  backClick() {
    this.modalController.dismiss();
  }

  doRefresh(event: any){

  }


}
