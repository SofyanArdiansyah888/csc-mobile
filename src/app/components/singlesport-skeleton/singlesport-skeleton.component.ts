import { Component, OnInit } from '@angular/core';
import {BaseHeaderComponent} from "../base-header/base-header.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-singlesport-skeleton',
  templateUrl: './singlesport-skeleton.component.html',
  styleUrls: ['./singlesport-skeleton.component.scss'],
  imports: [
    BaseHeaderComponent,
    IonicModule,
    NgForOf
  ],
  standalone: true
})
export class SinglesportSkeletonComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
