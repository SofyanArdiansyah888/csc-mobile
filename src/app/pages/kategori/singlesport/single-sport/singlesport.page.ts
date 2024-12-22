/* eslint-disable @typescript-eslint/naming-convention */
import {Location, NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IonicModule, ModalController} from '@ionic/angular';
import {VenueEntity} from 'src/app/entities/Venue.entity';
import {KebijakanPage} from 'src/app/pages/kebijakan/kebijakan.page';
import {ApiService} from 'src/app/services/api.service';
import {ModalService} from 'src/app/services/ionic/modal.service';
import {environment} from "../../../../../environments/environment";
import {BaseHeaderComponent} from "../../../../components/base-header/base-header.component";
import {SinglesportSkeletonComponent} from "../../../../components/singlesport-skeleton/singlesport-skeleton.component";

@Component({
  selector: 'app-singlesport',
  templateUrl: './singlesport.page.html',
  styleUrls: ['./singlesport.page.scss'],
  imports: [
    BaseHeaderComponent,
    IonicModule,
    SinglesportSkeletonComponent,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class SinglesportPage implements OnInit {
  venue: VenueEntity | null = null;
  loading = false;
  imageUrl = environment.imageUrl;
  constructor(
    private modalController: ModalController,
    private modalService: ModalService,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  async ngOnInit() {
    const temp = this.router.url.split('/');
    this.loading = true;
    const result = await this.apiService.venue(temp[4]);
    this.loading = false;
    this.venue = result?.data?.data;
  }

  backClick() {
    this.location.back();
  }

  termClick(venue?: VenueEntity | null) {
    // this.modalService.show(KebijakanPage, { venue });
  }

  pilihLapanganClick(venue: VenueEntity | null) {
    this.router.navigateByUrl(`${this.router.url}/pilih`);
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }
}
