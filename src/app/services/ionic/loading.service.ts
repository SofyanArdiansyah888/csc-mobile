import { Injectable } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: any;
  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ) {}

  async show() {
    // this.platform.backButton.subscribeWithPriority(10, () =>
    //   console.log("back")
    // );
    this.loading = await this.loadingController.create({
      message: 'Loading...',
    });
    this.loading.present();
  }

  async hide() {
    if (this.loading) {await this.loading.dismiss();}
    // this.platform.backButton.unsubscribe();
  }
}
