import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pilih-skeleton',
  templateUrl: './pilih-skeleton.component.html',
  styleUrls: ['./pilih-skeleton.component.scss'],
  imports: [
    IonicModule,
    NgForOf
  ],
  standalone: true
})
export class PilihSkeletonComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
