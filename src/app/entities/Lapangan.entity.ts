import { VenueEntity } from './Venue.entity';


export interface LapanganEntity {
  id?: number;
  id_venue?: number;
  nama: string;
  link_gambar: string;
  deskripsi: string;
  harga?: number;
  deskripsi_harga: string;
  tipe_lapangan?: string;
  tipe_alas?: string;
  sports?: string;
  created_at?: string;
  venue?: VenueEntity;
  isPromo?: boolean;
  promo?: string;
}

