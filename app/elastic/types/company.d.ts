export interface VendorDocument {
  id: number;
  moq: number | string;
  locations: string[] | string;
  materials: string[] | string;
  leadTime: number | string;
}

export interface CustomerDocument {
  id: number;
  name: string;
}
