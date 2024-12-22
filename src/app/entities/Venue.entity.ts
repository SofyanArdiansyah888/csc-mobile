import { KategoriEntity } from './Kategori.entity';
import { LapanganEntity } from './Lapangan.entity';
import { FasilitasEntity } from './Fasilitas.entity';


export interface VenueEntity {
  id?: number;
  nama: string;
  kota: string;
  hari_operasional: string;
  waktu_operasional: string;
  lokasi: string;
  latitude?: number;
  longitude?: number;
  term?: string;
  rating: string;
  deskripsi: string;
  logo: string;
  link_gambar1: string;
  link_gambar2: string;
  link_gambar3: string;
  // category_id?: number;
  kategori?: KategoriEntity;
  lapangans: LapanganEntity[];
  fasilitass: FasilitasEntity[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

