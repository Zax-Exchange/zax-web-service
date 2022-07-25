export interface VendorDocument {
  id: number;
  moq: string;
  locations: string[] | string;
  materials: string[] | string;
  leadTime: number;
}

export interface CustomerDocument {
  id: number;
  name: string;
}
