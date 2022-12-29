export interface VendorDocument {
  id: string;
  country: string;
  locations: string[];
  products: string[];
  leadTime: number;
}

export interface CustomerDocument {
  id: string;
  name: string;
}
