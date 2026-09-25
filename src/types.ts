export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  iconClass: string;
  features: string[];
  description: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  cadence: string;
  isFeatured?: boolean;
  allocation: string;
  privileges: string[];
}

export interface DestinationHub {
  id: string;
  name: string;
  emirate: string;
  country: string;
  lat: number;
  lng: number;
  airportCode: string;
  signatureExperience: string;
  enclaves: string[];
  classification: string;
}
