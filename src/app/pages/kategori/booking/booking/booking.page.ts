import {Component, OnInit} from '@angular/core';
import {BookingTimeEntity} from 'src/app/entities/BookingTime.entity';
import {CourtEntity} from 'src/app/entities/Court.entity';
import {ApiService} from 'src/app/services/api.service';
import {getAllDaysInMonth, getMonthName, thisMonth, thisYear, today,} from 'src/app/services/date.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {ModalService} from 'src/app/services/ionic/modal.service';
import {isSequence} from 'src/app/services/utils.service';
import {KeranjangPage} from '../keranjang/keranjang/keranjang.page';
import {Router} from '@angular/router';
import {Location, NgClass, NgForOf} from '@angular/common';
import {environment} from "../../../../../environments/environment";
import {BaseHeaderComponent} from "../../../../components/base-header/base-header.component";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  imports: [
    BaseHeaderComponent,
    IonicModule,
    NgForOf,
    NgClass
  ],
  standalone: true
})
export class BookingPage implements OnInit {
  court: CourtEntity = {
    name:'',
    image:'',
    description:'',
    price_description:'',
    created_at:''
  };

  bookingTimes: BookingTimeEntity[] = [];
  selectedTimes = [];
  selectedBookingTimes: BookingTimeEntity[] = [];
  imageUrl = environment.imageUrl;
  totalPrice = 0;

  // DATE
  selectedDate = Number(today());
  selectedMonth = Number(thisMonth());
  selectedYear = Number(thisYear());
  days = getAllDaysInMonth(this.selectedYear, this.selectedMonth);

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private modalService: ModalService,
    private router: Router,
    private location: Location
  ) {
  }


  async ngOnInit() {
    await this.initCourt();
    const result = await this.apiService.bookingTimes();
    this.bookingTimes = result.data.data;
    this.bookingTimes.map(
      (bookingTime) => {
        bookingTime.price = this.court.price;
        bookingTime.selected = false;
      }
    );
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

  dateClick(day:any) {
    this.days.map((item) => {
      item.booked = false;
      return item;
    });
    day.booked = true;
    this.selectedDate = day.date;
  }

  monthName(month: number) {
    return getMonthName(month);
  }

  onCheckboxChange(event:any, test:any) {
    if (event.checked) {
      test.selected = true;
    } else {
      test.selected = false;
    }
    this.countTotalPrice();
  }

  countTotalPrice(){
    this.totalPrice = 0;
    this.bookingTimes.map((times) => {
      if(times.selected)
        {this.totalPrice += Number(times.price)}
    });
  }

  async selanjutnyaClick() {
    const temp = this.selectedTimes.toString().replace(/[^0-9]/g, '');
    if (!isSequence(temp)) {
      this.alertService.fail('Waktu booking harus berurutan !');
      return;
    }
    // const { data } = await this.modalService.show(KeranjangPage, {
    //   bookingTimes: this.bookingTimes,
    //   bookingDate: new Date(
    //     this.selectedYear,
    //     this.selectedMonth,
    //     this.selectedDate
    //   ),
    //   court: this.court,
    // });
    // this.bookingTimes = data.bookingTimes;
    this.countTotalPrice();
  }

  doRefresh(event:any) {
    this.ngOnInit();
  }

  backClick(){
    this.location.back()
  }
}
