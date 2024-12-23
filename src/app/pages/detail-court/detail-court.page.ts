import {CommonModule, Location} from '@angular/common';
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
  selector: 'app-detail-court',
  templateUrl: './detail-court.page.html',
  styleUrls: ['./detail-court.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    BaseHeaderComponent,
    DetailLapanganSkeletonComponent
  ],
  standalone: true
})
export class DetailCourtPage implements OnInit {
  court: LapanganEntity | undefined =  undefined;
  imageUrl = environment.imageUrl;
  loading = false
  constructor(
    private modalController: ModalController,
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
    this.loading = true;
    const result = await this.apiService.court(temp[2]);
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

  bookingClick(){
    if(this.authService.isLoggedIn){
      this.router.navigateByUrl(`court/${this?.court?.id}/booking`);
    }else{
      this.alertService.fail('Silahkan login terlebih dahulu untuk dapat membooking!');
    }
  }
}
