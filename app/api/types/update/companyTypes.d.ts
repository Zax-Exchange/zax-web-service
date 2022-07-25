export interface UpdateVendorInput {
  id: number;
  data: UpdateVendorInputData;
}

export interface UpdateCustomerInput {
  id: number;
  data: UpdateCustomerInputData;
}


export interface UpdateCompanyInputData {
  name?: string;
  logo?: string;
  phone?: string;
  fax?: string;
  creditCardNumber?: string;
  creditCardExp?: string;
  creditCardCvv?: string;
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
