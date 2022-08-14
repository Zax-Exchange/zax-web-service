export interface UpdateVendorInput {
  id: string;
  data: UpdateVendorInputData;
}

export interface UpdateCustomerInput {
  id: string;
  data: UpdateCustomerInputData;
}


export interface UpdateCompanyInputData {
  name?: string;
  contactEmail?: string;
  logo?: string;
  phone?: string;
  fax?: string;
  country?: string;
  isActive?: boolean;
  isVerified?: boolean;
  companyUrl?: string;
}

export interface UpdateVendorInputData extends UpdateCompanyInputData {
  leadTime?: number;
  moq?: string;
  locations?: string[];
  materials?: string[];
}

export interface UpdateCustomerInputData extends UpdateCompanyInputData {

}
