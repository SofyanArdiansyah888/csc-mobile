import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ApiService} from 'src/app/services/api.service';
import {FormsModule} from "@angular/forms";
import {Location, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgOptimizedImage
  ],
  standalone: true
})
export class LoginPage {
  constructor(
    private apiService: ApiService,
    protected location: Location,
    protected router: Router,
  ) {
  }

  async login(loginData: any) {
    await this.apiService.loginOTP({
      nomor_hp: `0${loginData?.telepon}`
    });
    await this.router.navigateByUrl(`otp?tag=login&nomor_hp=0${loginData.telepon}`);
  }
}
