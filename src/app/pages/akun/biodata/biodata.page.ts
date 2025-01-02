import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ApiService} from 'src/app/services/api.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {FormsModule} from "@angular/forms";
import {BaseHeaderComponent} from "../../../components/base-header/base-header.component";
import {Location} from "@angular/common";
import {ClientEntity} from "../../../entities/Client.entity";

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html',
  styleUrls: ['./biodata.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    BaseHeaderComponent
  ],
  standalone: true
})
export class BiodataPage {
  user: ClientEntity = {
    nama: '',
    email: '',
    no_hp: '',
    alamat: '',
    created_at: ''
  };

  constructor(private apiService: ApiService,
              protected location: Location,
              private alertService: AlertService) {
    const client = localStorage.getItem('user');
    if (client) {
      this.user = JSON.parse(client);
    }
  }


  async updateProfile(form: any) {
    try {
      const result = await this.apiService.updateProfile({
        ...form,
        id: this.user.id
      });
      localStorage.setItem('user', JSON.stringify(result?.data?.data));
      await this.alertService.success('Berhasil Mengupdate Data Profile Anda!');
    } catch (error: any) {
      await this.alertService.fail(error.response.data.message);
    }
  }


}
