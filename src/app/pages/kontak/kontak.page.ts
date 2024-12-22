import {Component} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {BaseHeaderComponent} from "../../components/base-header/base-header.component";
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.page.html',
  styleUrls: ['./kontak.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent
  ],

  standalone: true
})
export class KontakPage {
  whatsapp = environment.waUrl
  constructor(private location: Location) {
  }
  backClick() {
    this.location.back()
  }
}
