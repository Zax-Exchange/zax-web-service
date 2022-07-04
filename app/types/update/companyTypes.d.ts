export interface UpdateCompanyInput {
  id: number;
  data: UpdateCompanyData
}

export interface UpdateCompanyData {
  name: string;
  logo: string;
  phone: string;
  fax: string;
  creditCardNumber: string;
  creditCardExp: string;
  creditCardCvv: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  leadTime: number;
  companyUrl: string;
}


