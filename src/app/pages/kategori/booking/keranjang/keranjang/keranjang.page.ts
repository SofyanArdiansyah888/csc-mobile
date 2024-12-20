import {Component, OnInit} from '@angular/core';
import {IonicModule, ModalController, NavController, NavParams} from '@ionic/angular';
import {BookingTimeEntity} from 'src/app/entities/BookingTime.entity';
import {CourtEntity} from 'src/app/entities/Court.entity';
import {VenueEntity} from 'src/app/entities/Venue.entity';
import {KebijakanPage} from 'src/app/pages/kebijakan/kebijakan.page';
import {ModalService} from 'src/app/services/ionic/modal.service';
import {ApiService} from 'src/app/services/api.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {BayarPage} from '../bayar/bayar/bayar.page';
import {BaseHeaderComponent} from "../../../../../components/base-header/base-header.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class KeranjangPage {
  // court: CourtEntity;
  // venue: VenueEntity;
  bookingTimes: BookingTimeEntity[] = [];
  bookingDate: any;
  totalPrice = 0;

  constructor(
    private modalController: ModalController,
    private modalService: ModalService,
    private apiService: ApiService,
    private alertService: AlertService,
    private navController: NavController,
    navParams: NavParams
  ) {
    const {data} = navParams;
    // this.court = data.court;
    // this.venue = data.venue;
    // this.bookingTimes = data.bookingTimes;
    // this.bookingDate = data.bookingDate;
    this.countTotalPrice();
    // console.log(this.court, 'court');
    // console.log(this.venue, 'venue');
    // console.log(this.bookingTimes, 'bookingTimes');
    // console.log(this.bookingDate, 'bookingDate');
  }

  countTotalPrice() {
    this.totalPrice = 0;
    this.bookingTimes.map((item) => {
      if (item.selected) {
        this.totalPrice += Number(item.price);
      }
    });
  }

  kebijakanClick() {
    // this.modalService.show(KebijakanPage, {venue: this.venue});
  }

  deleteClick(item: BookingTimeEntity) {
    item.selected = false;
    this.countTotalPrice();
  }
  doRefresh(event: any){}

  backClick() {
    // this.modalController.dismiss({
    //   court: this.court,
    //   venue: this.venue,
    //   bookingTimes: this.bookingTimes,
    //   bookingDate: this.bookingDate
    // });
  }

  async selanjutnyaClick() {
    // this.modalService.show(BayarPage, {
    //   court: this.court,
    //   venue: this.venue,
    //   bookingTimes: this.bookingTimes,
    //   bookingDate: this.bookingDate
    // });
  }

  // bookingClick() {
  // const data = {
  //   court_id: this.court.id,
  //   booking_times: [...this.bookingTimes],
  //   booking_date: format(this.bookingDate, 'yyyy-MM-dd'),
  // };

  // try {
  //   this.apiService.doBooking(data);
  //   this.alertService.success('Berhasil melakukan booking');
  //   this.modalController.dismiss();
  //   this.navController.navigateRoot('tabs/tab2');
  // } catch (error) {
  //   this.alertService.fail(error.message);
  // }
  // }
}
