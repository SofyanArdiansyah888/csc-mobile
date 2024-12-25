import {Component} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {ApiService} from 'src/app/services/api.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

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
    protected router: Router,
    private apiService: ApiService,
    protected location: Location
  ) {
  }

  async register(form: any) {
    await this.apiService.loginOTP({
      nomor_hp: `0${form?.telepon}`
    });
    await this.router.navigateByUrl(`otp?tag=register&nomor_hp=0${form.telepon}&nama=${form.nama}`);
  }

}
