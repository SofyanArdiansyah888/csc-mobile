import {Component} from '@angular/core';
import {BookingEntity} from '../../entities/Booking.entity';
import {ApiService} from '../../services/api.service';
import {AlertService} from '../../services/ionic/alert.service';
import {environment} from "../../../environments/environment";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonicModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class Tab2Page {
  bookings: BookingEntity[] = [];
  imageUrl = environment.imageUrl;
  loading = false;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) {
    this.init();
  }

  async init() {
    try {
      this.loading = true;
      const result = await this.apiService.bookings();
      this.loading = false;
      this.bookings = result.data.data;
    } catch (error: any) {
      this.alertService.fail(error.message);
    }
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.init();
      event.target.complete();
    }, 100);
  }
}
