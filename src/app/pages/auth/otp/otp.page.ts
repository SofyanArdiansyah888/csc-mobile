import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertController, IonicModule, LoadingController, NavController, NavParams,} from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
//import { AuthenticationService } from "src/app/service/auth/authentication.service";
//import { DatabaseService } from "src/app/service/database/database.service";
//import { ApiService } from "../../../service/api/api.service";
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgOptimizedImage
  ],
  standalone: true
})
export class OtpPage implements OnInit {
  dataform: any;
  regisdata = {};
  timeInSeconds: any;
  time: any;
  // runTimer: boolean;
  // hasFinished: boolean;
  // hasStarted: boolean;
  remainingTime: any;
  // displayTime: string;
  // otp: string;
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

  constructor(
    private route: ActivatedRoute,
    // private database: DatabaseService,
    private loadingCtrl: LoadingController,
    // private ApiService: ApiService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
    //private auth: AuthenticationService
  ) {
  }

  ngOnInit() {
    console.log("HEllox")
    // const dataregis = this.route.snapshot.paramMap.get('dataregis');
    // this.dataform = this.navParams.data.data;
    // this.dataform = JSON.parse(dataregis);
    // const email = this.dataform;
    // this.initTimer();
    // this.startTimer();
  }

  initTimer() {
    if (!this.timeInSeconds) {
      this.timeInSeconds = 420;
    }
    this.time = this.timeInSeconds;
    // this.runTimer = false;
    // this.hasStarted = false;
    // this.hasFinished = false;
    // this.remainingTime = this.timeInSeconds;
    // this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
    // this.runTimer = true;
    // this.hasStarted = true;
    // this.timerTick();
  }

  pauseTimer() {
    // this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    // setTimeout(() => {
    //   if (!this.runTimer) {
    //     return;
    //   }
    //   this.remainingTime--;
    //   this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
    //   if (this.remainingTime > 0) {
    //     this.timerTick();
    //   } else {
    //     this.hasFinished = true;
    //   }
    // }, 1000);
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

  onOtpChange(otp:any) {
    // this.otp = otp;
    // if (this.otp.length === 6) {
    //   this.emptycode = true;
    // }
  }

  register(form:any) {

  }

  backClick(){}


}
