import {Component} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {BaseHeaderComponent} from "../../components/base-header/base-header.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-detailpesanan',
  templateUrl: './detailpesanan.page.html',
  styleUrls: ['./detailpesanan.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent
  ],
  standalone: true
})
export class DetailpesananPage {

  constructor(protected location: Location) {
  }

  doRefresh(event: any) {

  }
}
