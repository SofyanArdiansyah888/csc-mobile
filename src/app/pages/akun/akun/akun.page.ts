import {Component, OnInit} from '@angular/core';
import {IonicModule, NavController} from '@ionic/angular';
import {KontakPage} from 'src/app/pages/kontak/kontak.page';
import {AuthenticationService} from 'src/app/services/auth/authentication.service';
import {DatabaseService} from 'src/app/services/database/database.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {ModalService} from 'src/app/services/ionic/modal.service';
import {BiodataPage} from '../biodata/biodata.page';
import {KebijakanPrivasiPage} from '../kebijakan-privasi/kebijakan-privasi.page';
import {SyaratKetentuanPage} from '../syarat-ketentuan/syarat-ketentuan.page';
import {UbahpassPage} from '../ubahpass/ubahpass.page';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class AkunPage{

  constructor(private alertService: AlertService,
              private authService: AuthenticationService,
              private databaseService: DatabaseService,
              private modalService: ModalService,
              private route: Router,
              private navController: NavController) {
  }


  keluarClick() {
    this.alertService.confirm('Apakah kamu yakin ingin keluar ?', 'Ya', 'Tidak', () => {
      this.authService.setLoggedIn(false);
      this.databaseService.clear();
      this.navController.navigateRoot('tabs/tab1');
    });
  }

  passwordClick() {
    this.route.navigateByUrl('ubah-pass')
    // this.modalService.show(UbahpassPage);
  }

  biodataClick() {
    this.route.navigateByUrl('biodata')
    // this.modalService.show(BiodataPage);
  }

  hubungiKamiClick() {
    this.route.navigateByUrl('kontak')
    // this.modalService.show(KontakPage);
  }

  syaratKetentuanClick() {
    this.route.navigateByUrl('syarat-ketentuan')
    // this.modalService.show(SyaratKetentuanPage);
  }

  kebijakanPrivasiClick() {
    this.route.navigateByUrl('kebijakan-privasi')
    // this.modalService.show(KebijakanPrivasiPage);
  }
}
