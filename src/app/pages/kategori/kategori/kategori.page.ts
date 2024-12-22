import {Component, OnInit} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';

import {KategoriEntity} from 'src/app/entities/Kategori.entity';
import {VenueEntity} from 'src/app/entities/Venue.entity';
import {ApiService} from 'src/app/services/api.service';
import {ModalService} from 'src/app/services/ionic/modal.service';
import {Router} from '@angular/router';
import {Location, NgForOf, NgIf} from '@angular/common';
import {environment} from "../../../../environments/environment";
import {BaseHeaderComponent} from "../../../components/base-header/base-header.component";

@Component({
  selector: 'app-olahraga',
  templateUrl: './kategori.page.html',
  styleUrls: ['./kategori.page.scss'],
  imports: [
    IonicModule,
    BaseHeaderComponent,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class KategoriPage implements OnInit {
  venues: VenueEntity[] = [];
  category: KategoriEntity = {
    id:0,
    nama:'Kategori',
    link_gambar:'',
    bg_color:'',
  };
  imageUrl = environment.imageUrl;
  loading = false;
  constructor(
    // navParams: NavParams,
    private router: Router,
    private location: Location,
    private modalController: ModalController,
    private modalService: ModalService,
    private apiService: ApiService) {
    // this.category = navParams.data.category;
   }

  async ngOnInit() {
    const temp = this.router.url.split('/');
    this.loading = true;
    const result =  await this.apiService.venues(temp[2]);
    const category = await this.apiService.category(temp[2]);
    this.category = category?.data?.data;

    this.loading = false;
    this.venues = result.data.data;
  }

  backClick(){
    this.location.back();
  }

  venueClick(venue: VenueEntity){
    this.router.navigateByUrl(`${this.router.url}/singlesport/${venue.id}`);
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.ngOnInit();
      event.target.complete();
    }, 100);
  }

}
