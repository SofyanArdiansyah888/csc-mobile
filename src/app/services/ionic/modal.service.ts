import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // constructor(private modalController: ModalController) {}

  modalInst = [];
  i = 0;

  storeModal(x: number) {
    // @ts-ignore
    this.modalInst[this.i] = x;
    this.i++;
  }

  // async show(component: HTMLIonModalElement, componentProps = {}) {
  //   const modal = await this.modalController.create({
  //     component,
  //     componentProps,
  //   });
  //   modal.present();
  //   return await modal.onWillDismiss();
  // }
}
