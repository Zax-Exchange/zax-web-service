import { gql } from "apollo-server-express";

const company = gql`
  type Company {
    id: Int
    name: String
    logo: String
    phone: String
    fax: String
    creditCardNumber: String
    creditCardExp: String
    creditCardCvv: String
    country: String
    planId: Int
    isActive: Boolean
    isVendor: Boolean
    isVerified: Boolean
    leadTime: Int
    companyUrl: String
    createdAt: String
    updatedAt: String
  }
`;

export default company;
