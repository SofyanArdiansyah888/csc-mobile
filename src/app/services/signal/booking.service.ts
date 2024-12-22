import {Injectable, signal} from '@angular/core';
import {LapanganEntity} from "../../entities/Lapangan.entity";
import {BookingTimeEntity} from "../../entities/BookingTime.entity";


interface IBookingValue {
  bookingTimes: BookingTimeEntity[]
  bookingDate: any;
  court?: LapanganEntity | null
}

@Injectable({
  providedIn: 'root', // Ensures a singleton instance
})
export class BookingService {
  initialBooking = {
    bookingTimes: [],
    bookingDate: null,
    court: null
  }
  // Shared signal
  private bookingSignal = signal<IBookingValue>(this.initialBooking);

  // Getter to access the signal
  get booking() {
    return this.bookingSignal;
  }

  doBooking(value: IBookingValue) {
    this.bookingSignal.set(value)
  }

  clearBooking(){
    this.bookingSignal.set(this.initialBooking)
  }

  // Increment the counter
  increment() {
    // this.bookingSignal.set(this.bookingSignal() + 1);
  }

  // Decrement the counter
  decrement() {
    // this.bookingSignal.set(this.bookingSignal() - 1);
  }
}
