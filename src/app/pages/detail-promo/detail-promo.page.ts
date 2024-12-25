import {Location, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IonicModule, ModalController} from '@ionic/angular';

import {LapanganEntity} from '../../entities/Lapangan.entity';
import {ApiService} from '../../services/api.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AlertService} from '../../services/ionic/alert.service';
import {ModalService} from '../../services/ionic/modal.service';
import {environment} from "../../../environments/environment";
import {BaseHeaderComponent} from "../../components/base-header/base-header.component";
import {
  DetailLapanganSkeletonComponent
} from "../../components/detail-lapangan-skeleton/detail-lapangan-skeleton.component";

@Component({
  selector: 'app-detail-promo',
  templateUrl: './detail-promo.page.html',
  styleUrls: ['./detail-promo.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent,
    NgIf,
    DetailLapanganSkeletonComponent
  ],
  standalone: true
})
export class DetailPromoPage implements OnInit {
  imageUrl = environment.imageUrl;
  court: LapanganEntity | undefined = undefined;
  loading = false
  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private modalService: ModalService,
    private router: Router,
    private apiService: ApiService,
    private location: Location
  ) {
  }

  async ngOnInit() {
    const temp = this.router.url.split('/');
    this.loading = true
    const result = await this.apiService.promo(temp[2]);
    this.loading = false
    this.court = result?.data?.data;
  }
  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }


  backClick() {
    this.location.back();
  }

}
