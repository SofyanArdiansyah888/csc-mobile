import { VenueEntity } from './Venue.entity';


export interface CourtEntity {
  id?: number;
  venue_id?: number;
  name: string;
  image: string;
  description: string;
  price?: number;
  price_description: string;
  field_type?: string;
  pedestal_type?: string;
  sports?: string;
  created_at?: string;
  venue?: VenueEntity;
  isPromo?: boolean;
  promo?: string;
}

