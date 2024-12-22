import {LapanganEntity} from './Lapangan.entity';

export interface BookingEntity {
  court_id: number;
  client_id: number;
  booking_number: string;
  booking_time: string;
  status: string;
  hour: number;
  court?: LapanganEntity;
}

