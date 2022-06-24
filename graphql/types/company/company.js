import { gql } from "apollo-server";

const user = gql`
  type Company {
    id: Int
    name: String
    email: String
    logo: String
    phone: String
    fax: String
    creditCardNumber: String
    creditCardExp: String
    creditCardCvv: String
    country: String
    planType: String
    isActive: Boolean
    isVendor: Boolean
    isVerified: Boolean
    isComplete: Boolean
    productTypes: String
    leadTime: Int
    companyUrl: String
    linkedinUrl: String
  }
`;

export default user;
