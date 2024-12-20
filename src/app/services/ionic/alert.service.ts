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
      message:
        `<div class="hw-backgrond"><img src="assets/olahraga/bullhorn-solid.svg" class="gambar-alert"></div> <br> <p class="hw-intro">Berhasil<p>${message}`,
      buttons: ['TERIMA KASIH'],
    });

    await alert.present();
  }

  async fail(message = 'Error') {
    const alert = await this.alertController.create({
      cssClass: 'gagalki konfirmasi',
      message:
        `<div class="hw-backgrond"><img src="assets/olahraga/bullhorn-solid.svg" class="gambar-alert"></div><br> <p class="hw-intro">Maaf<p>${message}`,
      //header: 'lupa',
      //message: 'Kami akan mengirimkan password baru ke alamat Email Anda.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirm(message: string, button1: any, button2:any, callback:any) {
    const alert = await this.alertController.create({
      cssClass: 'gagalki konfirmasi',
      message:
      `<div class="hw-backgrond"><img src="assets/olahraga/bullhorn-solid.svg" class="gambar-alert"></div><br> <p class="hw-intro">Maaf<p>${message}`,
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
    alert.present();
  }

  async forgetPassword(buttons: (string | AlertButton)[] | undefined) {
    const alert = await this.alertController.create({
      cssClass: 'konfirmasi hw-confir-reset',
      header: 'Lupa?',
      message: '<img class="hw-icon" src="assets/jac/global/lock-solid.svg">',
      inputs: [
        {
          name: 'alamatemail',
          type: 'text',
          placeholder: 'Masukkan email anda',
        },
      ],
      buttons,
    });
    return await alert.present();
  }
}
