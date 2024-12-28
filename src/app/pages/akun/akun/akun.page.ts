import {Component, OnInit} from '@angular/core';
import {IonicModule, NavController} from '@ionic/angular';
import {AuthenticationService} from 'src/app/services/auth/authentication.service';
import {DatabaseService} from 'src/app/services/database/database.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ClientEntity} from "../../../entities/Client.entity";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
  imports: [
    IonicModule,
    DatePipe
  ],
  standalone: true
})
export class AkunPage implements OnInit {
  client: ClientEntity | null = null
  constructor(private alertService: AlertService,
              private authService: AuthenticationService,
              private databaseService: DatabaseService,
              private route: Router,
              private navController: NavController) {
  }


  ngOnInit(): void {
      this.client = JSON.parse(localStorage.getItem('user') ?? '');
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
    // this.route.navigateByUrl('kebijakan-privasi')
    // this.modalService.show(KebijakanPrivasiPage);
  }

  protected readonly environment = environment;

}
