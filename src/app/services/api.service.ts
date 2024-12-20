import {Injectable} from '@angular/core';
import {BaseConfig} from './baseconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: BaseConfig) { }


  categories() {
    return this.api.get('categories');
  }

  category(id: string) {
    return this.api.get(`categories/${id}`);
  }

  advertisings() {
    return this.api.get('advertisings');
  }

  courts() {
    return this.api.get('courts');
  }

  court(id: string) {
    return this.api.get(`courts/${id}`);
  }

  promos(){
    return this.api.get('promos');
  }

  bookingTimes(){
    return this.api.get('booking-times');
  }

  bookings(){
    return this.api.get('bookings');
  }

  doBooking(data:any){
    return this.api.post('bookings',data);
  }

  venues(categoryId: any) {
    const urlParams = new URLSearchParams();
    urlParams.set('category_id', categoryId);
    return this.api.get(`venues?${urlParams}`);
  }

  venue(id: any) {
    return this.api.get(`venues/${id}`);
  }

  policies(){
    return this.api.get('policies');
  }




  // AUTH
  profile() {
    return this.api.get('profile');
  }
  updateProfile(data: {
    birthday: string;
    sex: string;
    name: string;
    email: string;
    phone: string;
    height: number;
    weight: number;
  }) {
    return this.api.post('update-profile',data);
  }
  forgotPassword(data: { email: string}) {
    return this.api.post('forget-password', data);
  }

  changePassword(data: { newPassword: string; confirmPassword: string }) {
    return this.api.post('change-password', data);
  }

  login(data: { username: string; password: string }) {
    return this.api.post('login', data);
  }

  sendOTP(data: { email: string}) {
    return this.api.post('send-otp', data);
  }

  register(data: { username: string; password: string }) {
    return this.api.post('register', data);
  }
}

