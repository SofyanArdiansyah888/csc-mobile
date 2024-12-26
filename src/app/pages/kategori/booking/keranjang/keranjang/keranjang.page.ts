import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {BookingTimeEntity} from 'src/app/entities/BookingTime.entity';
import {BaseHeaderComponent} from "../../../../../components/base-header/base-header.component";
import {CurrencyPipe, DatePipe, Location, NgForOf, NgIf} from "@angular/common";
import {BookingService} from "../../../../../services/signal/booking.service";
import {LapanganEntity} from "../../../../../entities/Lapangan.entity";
import {Router} from "@angular/router";
import {ApiService} from "../../../../../services/api.service";
import moment from "moment";
import {FormsModule} from "@angular/forms";
import {AlertService} from "../../../../../services/ionic/alert.service";
import {LoadingService} from "../../../../../services/ionic/loading.service";

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
    CurrencyPipe,
    FormsModule
  ],
  standalone: true
})
export class KeranjangPage {
  court: LapanganEntity | null | undefined = null;
  selectedPayment: string = 'full payment';
  bookingTimes: BookingTimeEntity[] = [];
  bookingDate: any;
  totalPrice = 0;
  diskon = 0
  kodeVoucher = null

  constructor(
    private bookingService: BookingService,
    private location: Location,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService,
    private loadingService: LoadingService
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
        if (times.status === 'checked') {
          this.totalPrice += Number(times.price ?? 0) ?? 0
        }
      });
    }
  }

  onPaymentChange(event: any) {
    this.selectedPayment = event.detail.value;
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

  async cekPromo() {
    this.loadingService.show()
    const result = await this.apiService.cekPromo(this.kodeVoucher ?? '')
    const promo = result?.data?.data;
    if (promo?.id) {
      this.diskon = promo?.max_voucher ?? 0
    } else {
      this.alertService.fail('Kode Voucher Tidak Valid');
    }

    this.loadingService.hide()

  }

  async selanjutnyaClick() {

    const payload = {
      'booking_times': this.bookingTimes,
      'id_client': '1', // TODO
      'id_lapangan': this.court?.id,
      'tanggal_booking': moment(this.bookingDate).format('YYYY-MM-DD'),
      'kode_voucher': this.kodeVoucher,
      'total_harga': this.totalPrice,
      'jenis_pembayaran' : this.selectedPayment
    }
    const dataBooking = await this.apiService.doBooking(payload)
    const nomorBooking = dataBooking?.data?.data?.nomor_booking;
    const nomorBookingTransaksi = dataBooking?.data?.data?.booking_transaksi?.nomor_booking_transaksi;

    await this.apiService.showMidtransPayment({
        nomor_booking: nomorBooking,
        nomor_booking_transaksi: nomorBookingTransaksi,
        // nomor_booking: 'BOK-20241225002',
        // nomor_booking_transaksi: 'BOK-20241225002-001',
        id_client: '1' // TODO
      },
      // SUKSES
      (result: any) => {
        this.alertService.success('Berhasil melakukan booking');
        this.router.navigateByUrl('tabs/tab2')
      },
      // ERROR
      (error: any) => {
        this.alertService.fail('Gagal melakukan pembayaran');
        this.router.navigateByUrl('tabs/tab2')
      },
      () => {
        this.alertService.fail('Pembayaran pending');
        this.router.navigateByUrl('tabs/tab2')
      },
      () => {
        this.alertService.fail('Pembayaran di batalkan');
        this.router.navigateByUrl('tabs/tab2')
      },
    )
    this.bookingService.clearBooking()
  }

}
