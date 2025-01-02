import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

import {AdvertisingEntity} from '../../entities/Advertising.entity';
import {KategoriEntity} from '../../entities/Kategori.entity';
import {LapanganEntity} from '../../entities/Lapangan.entity';
import {ApiService} from '../../services/api.service';
import {environment} from "../../../environments/environment";
import {IonicModule} from "@ionic/angular";
import {CommonModule, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {IonicSlides} from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonicModule,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    NgStyle,
    RouterLink,
    CommonModule,
    
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page {
  advertisings: AdvertisingEntity[] = [];
  categories: KategoriEntity[] = [];
  courts: LapanganEntity[] = [];
  promos: LapanganEntity[] = [];
  loading = false;
  imageUrl = environment.imageUrl;

  constructor(
    private api: ApiService,
    protected router: Router,
  ) {
    this.init();
  }

  async init() {
    this.loading = true;
    const [tempAdvertising, tempCategory, tempCourt, tempPromo] =
      await Promise.all([
        this.api.advertisings(),
        this.api.categories(),
        this.api.courts(),
        this.api.promos(),
      ]);
    this.loading = false;

    this.advertisings = tempAdvertising.data.data;
    this.categories = tempCategory.data.data;
    this.courts = tempCourt.data.data;
    this.promos = tempPromo.data.data;
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.init();
      event.target.complete();
    }, 100);
  }

  promoClick(court: LapanganEntity) {
    this.router.navigateByUrl(`court/${court.id}/detail-promo`);
  }

  courtClick(court: LapanganEntity) {
    this.router.navigateByUrl(`court/${court.id}/detail-court`)
  }


}
