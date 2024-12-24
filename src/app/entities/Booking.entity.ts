import {LapanganEntity} from './Lapangan.entity';

export interface BookingEntity {
  court_id: number;
  client_id: number;
  nomor_booking: string;
  tanggal_booking: string;
  total_harga: string;
  status: string;
  hour: number;
  lapangan?: LapanganEntity;
}

