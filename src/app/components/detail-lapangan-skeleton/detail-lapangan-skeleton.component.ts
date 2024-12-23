import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-detail-lapangan-skeleton',
  templateUrl: './detail-lapangan-skeleton.component.html',
  styleUrls: ['./detail-lapangan-skeleton.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class DetailLapanganSkeletonComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
