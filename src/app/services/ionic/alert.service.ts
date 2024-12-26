/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import {AlertButton, AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async success(message = '') {
    const alert = await this.alertController.create({
      cssClass: 'berhasilki konfirmasi',
      message:'',
      buttons: ['TERIMA KASIH'],
    });

    await this.show(alert, ` <div class="hw-backgrond">
        <img src="assets/olahraga/bullhorn-solid.svg" class="gambar-alert">
      </div>
      <br>
      <p class="hw-intro">Berhasil</p>
      <p>${message}</p>`)
  }

  async fail(message = 'Error') {
    const alert = await this.alertController.create({
      cssClass: 'gagalki konfirmasi',
      message:'',
      buttons: ['OK'],
    });

    this.show(alert,`<div class="hw-backgrond"><img src="assets/olahraga/bullhorn-solid.svg" class="gambar-alert"></div><br> <p class="hw-intro">Maaf<p>${message}`)
  }

  async confirm(message: string, button1: any, button2:any, callback:any) {
    const alert = await this.alertController.create({
      cssClass: 'gagalki konfirmasi',
      message,
      buttons: [
        {
          text: button1,
          cssClass: 'warna',
          handler: callback,
        },
        {
          text: button2,
          cssClass: 'hw-blank',
        },
      ],
    });
    this.show(alert,`<div class="hw-backgrond"><img src="assets/olahraga/bullhorn-solid.svg" class="gambar-alert"></div><br> <p class="hw-intro">Maaf<p>${message}`)
  }

  async forgetPassword(buttons: (string | AlertButton)[] | undefined) {
    const alert = await this.alertController.create({
      cssClass: 'konfirmasi hw-confir-reset',
      header: 'Lupa?',
      message: ``,
      inputs: [
        {
          name: 'alamatemail',
          type: 'text',
          placeholder: 'Masukkan email anda',
        },
      ],
      buttons,
    });
    return this.show(alert,'<img class="hw-icon" src="assets/jac/global/lock-solid.svg">')
  }

  private async show(alert:any,element: string){
    // Present the alert first
    await alert.present();

    // Inject HTML into the alert message container
    const alertElement = document.querySelector('ion-alert .alert-message');
    if (alertElement) {
      alertElement.innerHTML = `${element}`;
    }
  }
}
