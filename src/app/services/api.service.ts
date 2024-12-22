import {Injectable} from '@angular/core';
import {BaseConfig} from './baseconfig.service';
import axios from "axios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: BaseConfig) {
  }


  categories() {
    return this.api.get('categories');
  }

  category(id: string) {
    return this.api.get(`categories/${id}`);
  }

  advertisings() {
    return this.api.get('iklans');
  }

  courts() {
    return this.api.get('courts');
  }

  court(id: string) {
    return this.api.get(`courts/${id}`);
  }

  promos() {
    return this.api.get('promos');
  }

  bookingTimes() {
    return this.api.get('booking-times');
  }

  bookings() {
    return this.api.get('bookings');
  }

  doBooking(data: any) {
    return this.api.post('bookings', data);
  }

  venues(categoryId: any) {
    const urlParams = new URLSearchParams();
    urlParams.set('category_id', categoryId);
    return this.api.get(`venues?${urlParams}`);
  }

  venue(id: any) {
    return this.api.get(`venues/${id}`);
  }

  policies() {
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
    return this.api.post('update-profile', data);
  }

  forgotPassword(data: { email: string }) {
    return this.api.post('forget-password', data);
  }

  changePassword(data: { newPassword: string; confirmPassword: string }) {
    return this.api.post('change-password', data);
  }

  login(data: { username: string; password: string }) {
    return this.api.post('login', data);
  }

  sendOTP(data: { email: string }) {
    return this.api.post('send-otp', data);
  }

  register(data: { username: string; password: string }) {
    return this.api.post('register', data);
  }

  async showMidtransPayment(data: any) {
    (window as any)?.snap.show();

    // const data = {
    //   account_id: '1',
    //   receipt_id: 'CRC001'
    // }
    axios.post(environment.midtransUrl, {data}, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      const result = response.data
      if (!result.token) throw new Error("Token not found");

      (window as any)?.snap?.pay(result.token, {
        onSuccess: async function (result: any) {
          // console.log(result);
        },
        onPending: function (result: any) {
          // alert("Waiting for your payment!");
          console.log(result);
        },
        onError: function (result: any) {
          // alert("Payment failed!");
          console.log(result);
        },
        onClose: function () {
          // alert("You closed the popup without finishing the payment");
        },
      });
    }).catch(() => {
      (window as any)?.snap.hide();
    })

    // fetch('https://crc.banisadar.com/api/get-token', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(async (response) => {
    //     try {
    //       const result = await response.json(); // Tunggu hingga JSON selesai diparsing
    //       if (!result.token) throw new Error("Token not found");
    //
    //       (window as any)?.snap?.pay(result.token, {
    //         onSuccess: async function (result: any) {
    //           console.log(result);
    //         },
    //         onPending: function (result: any) {
    //           alert("Waiting for your payment!");
    //           console.log(result);
    //         },
    //         onError: function (result: any) {
    //           alert("Payment failed!");
    //           console.log(result);
    //         },
    //         onClose: function () {
    //           alert("You closed the popup without finishing the payment");
    //         },
    //       });
    //     } catch (error: any) {
    //       console.error(error);
    //       alert("Payment token does not exist");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Fetch error:", error);
    //     alert("Failed to fetch the token");
    //   });
  }
}

