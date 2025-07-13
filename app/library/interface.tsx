
export interface Nutrient {
  id: number;
  created_at: string; // ISO timestamp
  session_id: string;
  longitude: number; // <-- corrected spelling too
  latitude: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  altitude?: number; // optional if not always present
}
export type GridResult = {
  matrix: string[][];
  numRows: number;
  numCols: number;
  north: number;
  south: number;
  west: number;
  east: number;
};
export interface NutrientGuide {
  crop: string;
  minNitrogen: number;
  maxNitrogen: number;
  minPhosphorus: number;
  maxPhosphorus: number;
  minPotassium: number;
  maxPotassium: number;
  note?: string; // Optional
}

export interface Stock {
  M : number;
  L : number;
  Xl : number;
  XXL: number;
}



export interface UserProfile {
  created_at: string;
  user_id: string;
  land_ids: number[];
}

export interface SupabaseUserLite {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  app_metadata?: any;
  user_metadata?: any;
  created_at?: string;
}

export interface PolygonData {
  coords: LatLng[];
  area: number;
}

export type LatLng = [number, number];

export interface Land {
  id: string;
  created_at: string;
  name: string;
  area: number;
  polygon: PolygonData[];
  crop: string;
}

export  type NPKMmatrix = {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
}



// Props for authentication-related components
export interface AuthenticateProps {
  setOpenAuthModal: () => void;
}


export type session = {
  session_id: string;
  land_id: string | null;
}

 export type Location = {
  formatted: string;
  components: {
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    state?: string;
    province?: string;
    county?: string;
    country: string;
    country_code: string;
    postcode?: string;
    road?: string;
    neighbourhood?: string;
    municipality?: string;
    state_district?: string;
    continent?: string;
    house_number?: string;
    [key: string]: any; // for any additional fields OpenCage may return
  };
};

