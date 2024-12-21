import {Location, NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CourtEntity} from 'src/app/entities/Court.entity';
import {VenueEntity} from 'src/app/entities/Venue.entity';
import {ApiService} from 'src/app/services/api.service';
import {environment} from "../../../../../environments/environment";
import {BaseHeaderComponent} from "../../../../components/base-header/base-header.component";
import {IonicModule} from "@ionic/angular";
import {SinglesportSkeletonComponent} from "../../../../components/singlesport-skeleton/singlesport-skeleton.component";
import {PilihSkeletonComponent} from "../../../../components/pilih-skeleton/pilih-skeleton.component";


@Component({
  selector: 'app-pilih',
  templateUrl: './pilih.page.html',
  styleUrls: ['./pilih.page.scss'],
  imports: [
    BaseHeaderComponent,
    IonicModule,
    NgForOf,
    NgIf,
    PilihSkeletonComponent
  ],
  standalone: true
})
export class PilihPage implements OnInit {
  venue: VenueEntity | null = null;
  courts: CourtEntity[] = [];
  imageUrl = environment.imageUrl;
  loading = false;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private location: Location
  ) {
  }

  async ngOnInit() {
    const temp = this.router.url.split('/');
    this.loading = true
    const result =  await this.apiService.venue(temp[4]);
    this.loading = false
    this.venue = result?.data?.data;
    this.courts = this.venue?.courts ?? [];
  }

  backClick() {
    this.location.back();
  }

  bookingClick(court: CourtEntity) {
    this.router.navigateByUrl(`/court/${court.id}/booking`);
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }
}
