import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {PolicyEntity} from 'src/app/entities/Policy.entity';
import {ApiService} from 'src/app/services/api.service';
import {Location, NgOptimizedImage} from "@angular/common";
import {BaseHeaderComponent} from "../../../components/base-header/base-header.component";

@Component({
  selector: 'app-syarat-ketentuan',
  templateUrl: './syarat-ketentuan.page.html',
  styleUrls: ['./syarat-ketentuan.page.scss'],
  imports: [
    IonicModule,
    NgOptimizedImage,
    BaseHeaderComponent
  ],
  standalone: true
})
export class SyaratKetentuanPage implements OnInit {
  policies: PolicyEntity[] = [
    {
      name: '',
      description: '',
    },
    {
      name: '',
      description: '',
    },
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
