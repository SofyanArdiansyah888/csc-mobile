import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

import {AdvertisingEntity} from '../../entities/Advertising.entity';
import {CategoryEntity} from '../../entities/Category.entity';
import {CourtEntity} from '../../entities/Court.entity';
import {ApiService} from '../../services/api.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AlertService} from '../../services/ionic/alert.service';
import {ModalService} from '../../services/ionic/modal.service';
import {environment} from "../../../environments/environment";
import {IonicModule} from "@ionic/angular";
import {CommonModule, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonicModule,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    NgStyle,
    RouterLink,
    CommonModule,
    ButtonDirective,
  ],
  standalone: true
})
export class Tab1Page {
  advertisings: AdvertisingEntity[] = [];
  categories: CategoryEntity[] = [];
  courts: CourtEntity[] = [];
  promos: CourtEntity[] = [];
  loading = false;
  imageUrl = environment.imageUrl;

  constructor(
    private api: ApiService,
    private modal: ModalService,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.init();
  }

  async init() {
    this.loading = true;
    const [tempAdvertising, tempCategory, tempCourt] =
      await Promise.all([
        this.api.advertisings(),
        this.api.categories(),
        this.api.courts(),
      ]);
    this.loading = false;
    this.advertisings = tempAdvertising.data.data;
    this.categories = tempCategory.data.data;
    this.courts = tempCourt.data.data;
    this.promos = this.courts.filter((court) => court.promo !== "");
  }

  async doRefresh(event: any) {
    setTimeout(async () => {
      await this.init();
      event.target.complete();
    }, 100);
  }

  // promoClick(court: CourtEntity) {
    // this.router.navigateByUrl(`court/${court.id}/detail-promo`);
  // }

  courtClick(court: CourtEntity) {
    (window as any)?.snap.show();

    const data = {
      account_id: '1',
      receipt_id: 'CRC001'
    }

    fetch('https://crc.banisadar.com/api/get-token', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        try {
          const result = await response.json(); // Tunggu hingga JSON selesai diparsing
          if (!result.token) throw new Error("Token not found");

          (window as any)?.snap?.pay(result.token, {
            onSuccess: async function (result: any) {
              console.log(result);
            },
            onPending: function (result: any) {
              alert("Waiting for your payment!");
              console.log(result);
            },
            onError: function (result: any) {
              alert("Payment failed!");
              console.log(result);
            },
            onClose: function () {
              alert("You closed the popup without finishing the payment");
            },
          });
        } catch (error: any) {
          console.error(error);
          alert("Payment token does not exist");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Failed to fetch the token");
      });
    // this.router.navigate([`court/${court.id}/detail-court`])
    // this.router.navigateByUrl(`court/${court.id}/detail-court`);
  }

  kontakClick() {
    // this.modal.show(KontakPage);
  }

  // kategoriClick(category: CategoryEntity) {
  //   if (this.authService.isLoggedIn) {
  //     // this.modal.show(KategoriPage, {category});
  //   } else {
  //     this.alertService.fail('Silahkan login terlebih dahulu untuk dapat membooking!');
  //   }
  // }


  promoClick(item: any){



    // });
  }
}
