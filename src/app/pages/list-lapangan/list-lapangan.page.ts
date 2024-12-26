import {Component, OnInit} from '@angular/core';
import {Location, NgForOf, NgIf} from '@angular/common';
import {BaseHeaderComponent} from "../../components/base-header/base-header.component";
import {IonicModule} from "@ionic/angular";
import {PilihSkeletonComponent} from "../../components/pilih-skeleton/pilih-skeleton.component";
import {VenueEntity} from "../../entities/Venue.entity";
import {LapanganEntity} from "../../entities/Lapangan.entity";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {KategoriEntity} from "../../entities/Kategori.entity";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {AlertService} from "../../services/ionic/alert.service";

@Component({
  selector: 'app-list-lapangan',
  templateUrl: './list-lapangan.page.html',
  styleUrls: ['./list-lapangan.page.scss'],
  standalone: true,
  imports: [BaseHeaderComponent, IonicModule, PilihSkeletonComponent, NgForOf, NgIf]
})

export class ListLapanganPage implements OnInit {
  venue: VenueEntity | null = null;
  category?: KategoriEntity;
  courts: LapanganEntity[] = [];
  imageUrl = environment.imageUrl;
  loading = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private location: Location
  ) {
  }

  async ngOnInit() {
    const temp = this.router.url.split('/');
    this.loading = true
    const result = await this.apiService.courts(temp[2]);
    const category = await this.apiService.category(temp[2]);
    this.category = category?.data?.data;
    this.loading = false
    this.courts = result?.data?.data ?? [];
  }

  backClick() {
    this.location.back();
  }

  bookingClick(court: LapanganEntity) {

    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl(`/court/${court.id}/booking`);
    }else{
      this.alertService.confirm('Silahkan login terlebih dahulu untuk dapat membooking!','Login','Batal',()=> {
        this.router.navigateByUrl(`/login`);
      });
    }
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }


}
