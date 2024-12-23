import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {PolicyEntity} from 'src/app/entities/Policy.entity';
import {ApiService} from 'src/app/services/api.service';
import {BaseHeaderComponent} from "../../../components/base-header/base-header.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-kebijakan-privasi',
  templateUrl: './kebijakan-privasi.page.html',
  styleUrls: ['./kebijakan-privasi.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent
  ],
  standalone: true
})
export class KebijakanPrivasiPage implements OnInit {
  policies: PolicyEntity[] = [
    {
      name: '',
      description: '',
    }
  ];

  constructor(
    private apiService: ApiService,
    private location: Location
  ) {
  }

  async ngOnInit() {
    const temp = await this.apiService.policies();
    this.policies = temp.data.data;
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }

  backClick() {
    this.location.back()
  }
}
