export interface VendorDocument {
  companyId: number;
  name: string;
  moq: number | null;
  locations: string[] | null;
  leadTime: number | null;
}

export interface CustomerDocument {
  companyId: number;
  name: string;
  moq: number | null;
  locations: string[] | null;
  leadTime: number | null;
}