/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IonicModule, ModalController} from '@ionic/angular';
import {BaseHeaderComponent} from "../../../../../../components/base-header/base-header.component";

@Component({
  selector: 'app-instruksi',
  templateUrl: './instruksi.page.html',
  styleUrls: ['./instruksi.page.scss'],
  imports: [
    BaseHeaderComponent,
    IonicModule
  ],
  standalone: true
})
export class InstruksiPage implements OnInit {
  public timer = 60;

  public m = 1;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {
    this.start();
  }

  start() {
    // const IntervalVar = setInterval(
    //   function() {
    //     this.timer--;
    //
    //     if (this.timer === 0) {
    //       this.timer = 60;
    //
    //       this.m -= 1;
    //     }
    //
    //     if (this.m === 0) {
    //       this.timer = '00';
    //
    //       this.m = '00';
    //
    //       clearInterval(IntervalVar);
    //     }
    //   }.bind(this),
    //   1000
    // );
  }

  backClick() {
    this.modalController.dismiss();
  }

  bookingClick() {
    this.router.navigateByUrl('/tabs/tab3');
    setTimeout(() => {
      const modals = document.getElementsByTagName('ion-modal');
      const inputList = Array.prototype.slice.call(modals);
      inputList.map((modal) => {
        modal.style.visibility = 'hidden';
      });
    }, 300);
  }

  doRefresh(event: any){

  }

  ngOnInit() {}
}
