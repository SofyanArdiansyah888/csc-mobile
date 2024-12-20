import {Component} from '@angular/core';
import {AlertController, IonicModule, ModalController, NavController} from '@ionic/angular';
import {ApiService} from 'src/app/services/api.service';
import {AuthenticationService} from 'src/app/services/auth/authentication.service';
import {DatabaseService} from 'src/app/services/database/database.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {ModalService} from 'src/app/services/ionic/modal.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-daftar',
  templateUrl: './daftar.page.html',
  styleUrls: ['./daftar.page.scss'],
  imports: [
    IonicModule,
    FormsModule
  ],
  standalone: true
})
export class DaftarPage {

  constructor(
    private alertController: AlertController,
    private authService: AuthenticationService,
    private navController: NavController,
    private modalController: ModalController,
    private alertService: AlertService,
    private apiService: ApiService,
    private databaseService: DatabaseService,
    private modalService: ModalService
  ) {
  }


  backClick() {
    this.modalController.dismiss();
  }

  async register(form: any) {
    try {
      const result = await this.apiService.sendOTP(form);
      if (result.data.status === true) {
        // this.modalService.show(OtpPage,{data:form});
      } else {
        this.alertService.fail(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
