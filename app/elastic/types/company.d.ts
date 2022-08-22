export interface VendorDocument {
  id: string;
  moq: string;
  locations: string[];
  materials: string[];
  leadTime: number;
}

export interface CustomerDocument {
  id: string;
  name: string;
}
