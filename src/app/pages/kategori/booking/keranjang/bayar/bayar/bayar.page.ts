import {Component} from '@angular/core';
import {IonicModule, ModalController, NavParams} from '@ionic/angular';
import {BookingTimeEntity} from 'src/app/entities/BookingTime.entity';
import {ModalService} from 'src/app/services/ionic/modal.service';
import {BaseHeaderComponent} from "../../../../../../components/base-header/base-header.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-bayar',
  templateUrl: './bayar.page.html',
  styleUrls: ['./bayar.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent,
    NgOptimizedImage
  ],
  standalone: true
})
export class BayarPage {
  // court: CourtEntity ;
  // venue: VenueEntity ;
  bookingTimes: BookingTimeEntity[] = [];
  bookingDate: any;
  totalPrice = 0;

  constructor(
    private modalService: ModalService,
    private modalController: ModalController,
    navParams: NavParams
  ) {
    const {data} = navParams;
    // this.court = data.court;
    // this.venue = data.venue;
    // this.bookingTimes = data.bookingTimes;
    // this.bookingDate = data.bookingDate;
    this.countTotalPrice();
  }

  selanjutnyaClick() {
    // this.modalService.show(InstruksiPage, {
    //   court: this.court,
    //   venue: this.venue,
    //   bookingTimes: this.bookingTimes,
    //   bookingDate: this.bookingDate,
    // });
  }

  countTotalPrice() {
    this.totalPrice = 0;
    this.bookingTimes.map((item) => {
      if (item.selected) {
        this.totalPrice += Number(item.price);
      }
    });
  }

  backClick() {
    // this.modalController.dismiss({
    //   court: this.court,
    //   venue: this.venue,
    //   bookingTimes: this.bookingTimes,
    //   bookingDate: this.bookingDate,
    // });
  }

  doRefresh(event: any) {

  }
}
