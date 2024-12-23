import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {BookingTimeEntity} from 'src/app/entities/BookingTime.entity';
import {BaseHeaderComponent} from "../../../../../components/base-header/base-header.component";
import {CurrencyPipe, DatePipe, Location, NgForOf, NgIf} from "@angular/common";
import {BookingService} from "../../../../../services/signal/booking.service";
import {LapanganEntity} from "../../../../../entities/Lapangan.entity";
import {Router} from "@angular/router";
import {ApiService} from "../../../../../services/api.service";
import * as moment from "moment";

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent,
    NgForOf,
    NgIf,
    DatePipe,
    CurrencyPipe
  ],
  standalone: true
})
export class KeranjangPage {
  court: LapanganEntity | null | undefined = null;
  // venue: VenueEntity;
  bookingTimes: BookingTimeEntity[] = [];
  bookingDate: any;
  totalPrice = 0;

  constructor(
    private bookingService: BookingService,
    private location: Location,
    private router: Router,
    private apiService: ApiService
  ) {
    const booking = this.bookingService.booking()
    this.bookingTimes = booking.bookingTimes
    this.bookingDate = booking.bookingDate
    this.court = booking.court
    this.countTotalPrice();
  }

  countTotalPrice() {
    this.totalPrice = 0;
    if (this?.court?.status_waktu == false) {
      this.totalPrice = this.court?.harga ?? 0
    } else {
      this.bookingTimes.map((times) => {
        if (times.status === 'booked') {
          this.totalPrice += Number(times.price ?? 0) ?? 0
        }
      });
    }
  }

  kebijakanClick() {
    // this.router.navigateByUrl(``)
    // this.modalService.show(KebijakanPage, {venue: this.venue});
  }

  deleteClick(item: BookingTimeEntity) {
    item.status = 'default';
    this.countTotalPrice();
  }

  backClick() {
    this.location.back()
  }

  async selanjutnyaClick() {

    const payload = {
      'booking_times': this.bookingTimes,
      'id_client': '1', // TODO
      'id_lapangan': this.court?.id,
      'tanggal_booking': moment(this.bookingDate).format('YYYY-MM-DD'),
      'kode_voucher': '',
      'total_harga': this.totalPrice
    }
    console.log("DATA BOOKING",payload)
    const dataBooking = await this.apiService.doBooking(payload)
    console.log("DATA BOOKING RESPONSE:",dataBooking)

    // this.apiService.showMidtransPayment({
    //
    // })

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
