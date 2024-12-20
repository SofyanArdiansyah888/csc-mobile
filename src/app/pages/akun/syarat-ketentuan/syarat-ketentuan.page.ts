import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController, NavParams} from '@ionic/angular';
import { PolicyEntity } from 'src/app/entities/Policy.entity';
import { ApiService } from 'src/app/services/api.service';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-syarat-ketentuan',
  templateUrl: './syarat-ketentuan.page.html',
  styleUrls: ['./syarat-ketentuan.page.scss'],
  imports: [
    IonicModule,
    NgOptimizedImage
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
    private modalController: ModalController
  ) {}

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
    this.modalController.dismiss();
  }
}
