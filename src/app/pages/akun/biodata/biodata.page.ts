import {Component, OnInit} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {UserEntity} from 'src/app/entities/User.entity';
import {ApiService} from 'src/app/services/api.service';
import {AlertService} from 'src/app/services/ionic/alert.service';
import {FormsModule} from "@angular/forms";
import {BaseHeaderComponent} from "../../../components/base-header/base-header.component";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

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
export class BiodataPage implements OnInit {
  user: UserEntity = {
    name: '',
    email: '',
    client: {
      sex: '',
      birthday: '',
      height: '',
      weight: '',
      phone: '',
      photo: ''
    }
  };

  constructor(private apiService: ApiService,
              private router: Router,
              private location: Location,
              private alertService: AlertService) {
  }

  async ngOnInit() {
    const result = await this.apiService.profile();
    this.user = result.data;
  }

  async updateProfile(form:any) {
    try {
      const result = await this.apiService.updateProfile(form);
      if (result.data.status === true) {
        this.alertService.success('Berhasil Mengupdate Data Profile Anda!');
      } else {
        this.alertService.fail(result.data.message);
      }
    } catch (error: any) {
      this.alertService.fail(error.response.data.message);
    }
  }

  backClick() {
    this.location.back()
  }

}
