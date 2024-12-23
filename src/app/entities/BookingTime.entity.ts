export interface BookingTimeEntity {
  id?: number;
  name: string;
  booking_time: string;
  price?: number;
  status: 'booked' | 'default' | 'not available' | 'checked';
}

