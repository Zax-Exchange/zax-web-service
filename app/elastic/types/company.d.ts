export interface VendorDocument {
  id: string;
  name: string;
  country: string;
  locations: string[];
  products: string[];
}

export interface UpdateVendorDocumentInputData {
  name?: string;
  country?: string;
  locations?: string[];
  products?: string[];
}

export interface UpdateVendorDocumentInput {
  id: string;
  data: UpdateVendorDocumentInputData;
}

export interface CustomerDocument {
  id: string;
  name: string;
}
