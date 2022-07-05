import * as planTypes from "../common/planTypes";

export interface CreateCompanyInput {
  name: string;
  logo: string;
  phone: string;
  fax: string | undefined;
  creditCardNumber: string;
  creditCardExp: string;
  creditCardCvv: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  leadTime: number | undefined;
  companyUrl: string;
  planId: number;
}