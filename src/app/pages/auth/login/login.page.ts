import {Component, OnInit} from '@angular/core';
import {AlertController, IonicModule, ModalController, NavController} from '@ionic/angular';
import {ApiService} from 'src/app/services/api.service';
import {AuthenticationService} from 'src/app/services/auth/authentication.service';
import {DatabaseService} from 'src/app/services/database/database.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {LoadingService} from 'src/app/services/ionic/loading.service';
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
export class LoginPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private alertService: AlertService,
    private apiService: ApiService,
    private location: Location,
    private router: Router,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    console.log('')
  }

  backClick() {
    this.location.back();
  }

  daftarClick() {
    this.router.navigateByUrl('daftar')
  }

  async login(loginData: any) {
    await this.apiService.loginOTP({
      nomor_hp: `0${loginData?.telepon}`
    });
    await this.router.navigateByUrl(`otp?tag=login&nomor_hp=0${loginData.telepon}`);
  }

  async lupakiAlert() {
    const alert = await this.alertController.create({
      cssClass: 'konfirmasi',
      message:
        '<div class="hw-backgrond"><img src="assets/olahraga/lock-solid.svg" class="gambar-alert"></div> <br> <p class="hw-intro">Lupa ?<p>',
      buttons: [{
        text: 'Kirim Password',
        role: 'confirm',
        handler: (data) => {
          this.kirimEmail(data.alamatemail);
        }
      }],
      inputs: [
        {
          type: 'email',
          placeholder: 'Masukkan Email Anda',
          name: 'alamatemail',
          min: 1,
          max: 100,
        },
      ],
    });

    await alert.present();
  }

  async kirimEmail(email: string) {
    this.loadingService.show();
    try {
      const result: any = await this.apiService.forgotPassword({email});
      console.log(result);
      console.log(result.data.status);
      if (!result.data.status) {
        this.alertService.fail(result.data.message);
      } else if (result.data.status) {
        this.alertService.success(result.data.message);
      } else if (result.data.status === 400) {
        this.alertService.fail('email not falid');
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingService.hide();
    }
  }


}
