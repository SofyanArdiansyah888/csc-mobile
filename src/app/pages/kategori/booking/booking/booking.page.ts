import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookingTimeEntity} from 'src/app/entities/BookingTime.entity';
import {LapanganEntity} from 'src/app/entities/Lapangan.entity';
import {ApiService} from 'src/app/services/api.service';
import {getAllDaysInMonth, getMonthName, thisMonth, thisYear, today,} from 'src/app/services/date.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {Router} from '@angular/router';
import {CurrencyPipe, Location, NgClass, NgForOf, NgIf} from '@angular/common';
import {environment} from "../../../../../environments/environment";
import {BaseHeaderComponent} from "../../../../components/base-header/base-header.component";
import {IonicModule} from "@ionic/angular";
import {BookingService} from "../../../../services/signal/booking.service";
import moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  imports: [
    BaseHeaderComponent,
    IonicModule,
    NgForOf,
    NgClass,
    CurrencyPipe,
    NgIf
  ],
  standalone: true
})
export class BookingPage implements OnInit {
  @ViewChild('innerDiv') innerDiv!: ElementRef;

  court?: LapanganEntity = undefined;

  bookingTimes: BookingTimeEntity[] = [];
  selectedTimes = [];
  selectedBookingTimes: BookingTimeEntity[] = [];
  imageUrl = environment.imageUrl;
  totalPrice: number = 0;

  // DATE
  selectedDate = Number(today());
  selectedMonth = Number(thisMonth());
  selectedYear = Number(thisYear());
  days = getAllDaysInMonth(this.selectedYear, this.selectedMonth);

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    private bookingService: BookingService
  ) {
  }


  async ngOnInit() {
    this.days.map((item) => {
      item.booked = item.date === this.selectedDate;
      return item;
    });
    setTimeout(() => {
      this.scrollToToday()
    });

    await this.initCourt();
    const result = await this.apiService.bookingTimes(`${this.selectedYear}-${this.selectedMonth+1}-${this.selectedDate}`);
    this.bookingTimes = result.data.data?.filter((item:any) => item?.status === 'default');
    this.bookingTimes.map(
      (bookingTime) => {
        bookingTime.price = this?.court?.harga ?? 0;
      }
    );


    this.countTotalPrice();

  }

  scrollToToday(): void {

    const todayElement = this.innerDiv.nativeElement.querySelector(
      `li[data-date="${moment().date()}"]`
    );

    if (todayElement) {
      todayElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'center' });
    } else {
      console.warn('Today\'s element not found in the list!');
    }
  }

  ionViewWillEnter(){
    this.countTotalPrice();
  }


  async initCourt(){
    const temp = this.router.url.split('/');
    const result =  await this.apiService.court(temp[2]);
    this.court = result?.data?.data;
  }

  nextMonth() {
    this.selectedMonth += 1;
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear += 1;
    }
    this.days = getAllDaysInMonth(this.selectedYear, this.selectedMonth);
  }

  prevMonth() {
    this.selectedMonth -= 1;
    if (this.selectedMonth < 1) {
      this.selectedMonth = 11;
      this.selectedYear -= 1;
    }
    this.days = getAllDaysInMonth(this.selectedYear, this.selectedMonth);
  }

  async dateClick(day: any) {
    this.days.map((item) => {
      item.booked = false;
      return item;
    });
    day.booked = true;
    this.selectedDate = day.date;
    const result = await this.apiService.bookingTimes(`${this.selectedYear}-${this.selectedMonth + 1}-${this.selectedDate}`);
    this.bookingTimes = result.data.data?.filter((item:any) => item?.status === 'default');;
    this.bookingTimes.map(
      (bookingTime) => {
        bookingTime.price = this?.court?.harga ?? 0;
      }
    );
  }

  monthName(month: number) {
    return getMonthName(month);
  }

  onCheckboxChange(event:any, test:any) {
    if (event.checked) {
      test.status = 'checked'
    } else {
      test.status = 'default';
    }
    this.countTotalPrice();
  }

  countTotalPrice(){
    this.totalPrice = 0;
    if(this?.court?.status_waktu == false){
      this.totalPrice = this.court?.harga ?? 0
    }else{
      this.bookingTimes.map((times) => {
        if(times.status === 'checked') {
          this.totalPrice += Number(times.price ?? 0) ?? 0}
      });
    }

  }

  async selanjutnyaClick() {
    this.bookingService.doBooking({
      bookingTimes: this.bookingTimes,
      bookingDate: new Date(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDate
      ),
      court: this.court
    })
    this.router.navigateByUrl(`/court/${this?.court?.id}/booking/keranjang`);
    this.countTotalPrice();
  }

  isBookingTimesChecked():boolean{
      return this.bookingTimes.filter((item) => item.status === 'checked').length > 0
  }

  backClick(){
    this.location.back()
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }
}
