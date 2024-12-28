import {CurrencyPipe, DatePipe, Location, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {LapanganEntity} from '../../entities/Lapangan.entity';
import {ApiService} from '../../services/api.service';
import {environment} from "../../../environments/environment";
import {BaseHeaderComponent} from "../../components/base-header/base-header.component";
import {
  DetailLapanganSkeletonComponent
} from "../../components/detail-lapangan-skeleton/detail-lapangan-skeleton.component";
import {PromoEntity} from "../../entities/Promo.entity";
import {formatRupiah} from "../../services/utils.service";

@Component({
  selector: 'app-detail-promo',
  templateUrl: './detail-promo.page.html',
  styleUrls: ['./detail-promo.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent,
    NgIf,
    DetailLapanganSkeletonComponent,
    CurrencyPipe,
    DatePipe
  ],
  standalone: true
})
export class DetailPromoPage implements OnInit {
  imageUrl = environment.imageUrl;
  promo: PromoEntity | undefined = undefined;
  loading = false

  constructor(
    private router: Router,
    private apiService: ApiService,
    protected location: Location
  ) {
  }

  async ngOnInit() {
    const temp = this.router.url.split('/');
    this.loading = true
    const result = await this.apiService.promo(temp[2]);
    this.loading = false
    this.promo = result?.data?.data;
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }

  protected readonly formatRupiah = formatRupiah;
}
