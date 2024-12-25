import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule,} from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {Location, NgIf, NgOptimizedImage} from "@angular/common";
import {NgOtpInputComponent} from "ng-otp-input";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/ionic/alert.service";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgOptimizedImage,
    NgOtpInputComponent,
    NgIf
  ],
  standalone: true
})
export class OtpPage implements OnInit {
  dataform: any;
  timeInSeconds: any;
  time: any;
  runTimer: boolean = false;
  hasFinished: boolean = false;
  hasStarted: boolean = false;
  remainingTime: any;
  displayTime: string = '00:00';
  otp: string = '';
  showOtpComponent = true;
  emptycode = false;

  @ViewChild('ngOtpInput', {static: false}) ngOtpInput: any;

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '35px',
      height: '35px',
      background: '#dedede',
      'border-radius': '50px',
      border: '0',
    },
  };

  constructor(private apiService: ApiService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService
  ) {
  }

  ngOnInit() {

    const dataRegis = this.route.snapshot.queryParams;
    this.dataform = dataRegis
    this.initTimer();
    this.startTimer();
  }

  initTimer() {
    if (!this.timeInSeconds) {
      this.timeInSeconds = 300;
    }
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }


  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) {
        return;
      }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      } else {
        this.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - hours * 3600) / 60);
    const seconds = secNum - hours * 3600 - minutes * 60;
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = hours < 10 ? '0' + hours : hours.toString();
    minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.otp.length === 6) {
      this.emptycode = true;
    }
  }

  async register(form: any) {
    try {
      if (this.dataform.tag === 'login') {
        const result = await this.apiService.login({
          nomor_hp: this.dataform.nomor_hp,
          kode_otp: this.otp
        })
        localStorage.setItem('user', JSON.stringify(result.data.data));
      }
      if (this.dataform.tag === 'register') {
        const result = await this.apiService.register({
          ...this.dataform,
          kode_otp: this.otp
        })
        localStorage.setItem('user', JSON.stringify(result.data.data));
      }
      this.router.navigateByUrl('/tabs/tab1')
    } catch (error: any) {
      await this.alertService.fail(error.response.data.message);
    }

  }

  backClick() {
    this.location.back()
  }


}
