import { VenueEntity } from './Venue.entity';
import {KategoriEntity} from "./Kategori.entity";


export interface LapanganEntity {
  id?: number;
  id_venue?: number;
  id_kategori?: number;
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
  kategori?: KategoriEntity;
  status_waktu: boolean;
  isPromo?: boolean;
  promo?: string;
}

