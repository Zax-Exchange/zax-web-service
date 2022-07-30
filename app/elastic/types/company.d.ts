export interface VendorDocument {
  id: string;
  moq: string;
  locations: string[] | string;
  materials: string[] | string;
  leadTime: number;
}

export interface CustomerDocument {
  id: string;
  name: string;
}
