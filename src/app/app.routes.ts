import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/pages/tabs/tabs.routes').then((m) => m.routes),
  },

  {
    path: 'court/:id/booking',
    loadComponent: () => import('./pages/kategori/booking/booking/booking.page').then(m => m.BookingPage)
  },
  {
    path: 'court/:id/booking/keranjang',
    loadComponent: () => import('./pages/kategori/booking/keranjang/keranjang/keranjang.page').then(m => m.KeranjangPage)
  },

  {
    path: 'category/:id',
    // loadComponent: () => import('./pages/kategori/kategori/kategori.page').then(m => m.KategoriPage)
    loadComponent: () => import('./pages/list-lapangan/list-lapangan.page').then(m => m.ListLapanganPage)
  },
  {
    path: 'category/:id/singlesport/:singeSportID',
    loadComponent: () => import('./pages/kategori/singlesport/single-sport/singlesport.page').then(m => m.SinglesportPage)
  },
  {
    path: 'category/:id/singlesport/:singeSportID/pilih',
    loadComponent: () => import('./pages/kategori/singlesport/pilih/pilih.page').then(m => m.PilihPage)
  },
  {
    path: 'detailpesanan',
    loadComponent: () => import('./pages/detail-pesanan/detailpesanan.page').then(m => m.DetailpesananPage)
  },
  {
    path: 'akun',
    loadComponent: () => import('./pages/akun/akun/akun.page').then(m => m.AkunPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'otp',
    loadComponent: () => import('./pages/auth/otp/otp.page').then(m => m.OtpPage)
  },
  {
    path: 'daftar',
    loadComponent: () => import('./pages/auth/daftar/daftar.page').then(m => m.DaftarPage)
  },
  {
    path: 'syarat',
    loadComponent: () => import('./pages/syarat/syarat.page').then(m => m.SyaratPage)
  },
  {
    path: 'kebijakan',
    loadComponent: () => import('./pages/kebijakan/kebijakan.page').then(m => m.KebijakanPage)
  },
  {
    path: 'kontak',
    loadComponent: () => import('./pages/kontak/kontak.page').then(m => m.KontakPage)
  },
  {
    path: 'coming',
    loadComponent: () => import('./pages/coming/coming.page').then(m => m.ComingPage)
  },
  {
    path: 'court/:id/detail-promo',
    loadComponent: () => import('./pages/detail-promo/detail-promo.page').then(m => m.DetailPromoPage)
  },
  {
    path: 'court/:id/detail-court',
    loadComponent: () => import('./pages/detail-court/detail-court.page').then(m => m.DetailCourtPage)
  },


  // AKUN
  {
    path: 'biodata',
    loadComponent: () => import('./pages/akun/biodata/biodata.page').then(m => m.BiodataPage)
  },
  {
    path: 'ubah-pass',
    loadComponent: () => import('./pages/akun/ubahpass/ubahpass.page').then(m => m.UbahpassPage)
  },
  {
    path: 'kontak',
    loadComponent: () => import('./pages/kontak/kontak.page').then(m => m.KontakPage)
  },
  {
    path: 'syarat-ketentuan',
    loadComponent: () => import('./pages/akun/syarat-ketentuan/syarat-ketentuan.page').then(m => m.SyaratKetentuanPage)
  },
  {
    path: 'kebijakan-privasi',
    loadComponent: () => import('./pages/akun/kebijakan-privasi/kebijakan-privasi.page').then(m => m.KebijakanPrivasiPage)
  },
  {
    path: 'list-lapangan',
    loadComponent: () => import('./pages/list-lapangan/list-lapangan.page').then(m => m.ListLapanganPage)
  },
];
