export interface VendorDocument {
  id: string;
  moq: string;
  country: string;
  locations: string[];
  products: string[];
  leadTime: number;
}

export interface CustomerDocument {
  id: string;
  name: string;
}
