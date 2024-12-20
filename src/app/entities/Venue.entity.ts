import { CategoryEntity } from './Category.entity';
import { CourtEntity } from './Court.entity';
import { FacilityEntity } from './Facility.entity';


export interface VenueEntity {
  id?: number;
  name: string;
  city: string;
  operating_day: string;
  operating_time: string;
  location: string;
  latitude?: number;
  longitude?: number;
  terms?: string;
  rating: string;
  description: string;
  logo: string;
  image1: string;
  image2: string;
  image3: string;
  category_id?: number;
  category?: CategoryEntity;
  courts: CourtEntity[];
  facilities: FacilityEntity[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

