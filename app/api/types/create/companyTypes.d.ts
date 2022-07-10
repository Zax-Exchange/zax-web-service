import * as planTypes from "../common/planTypes";

export interface CreateCompanyInput {
  name: string;
  logo: string;
  phone: string;
  fax: string | null;
  creditCardNumber: string;
  creditCardExp: string;
  creditCardCvv: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  leadTime: number | null;
  locations: string[] | null;
  moq: number | null;
  companyUrl: string;
  planId: number;
}