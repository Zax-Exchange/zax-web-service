import sequelize from "../../postgres/dbconnection";
import * as createCompanyTypes from "../types/create/companyTypes";
import * as commonPlanTyes from "../types/common/planTypes";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import CompanyApiUtils from "../utils/companyUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Options } from "nodemailer/lib/mailer";



const createCompany = async (data: createCompanyTypes.CreateCompanyInput): Promise<boolean> => {
  const { name, logo, phone, fax, creditCardNumber, creditCardCvv, creditCardExp, country, isActive, isVendor, isVerified, leadTime, companyUrl, planId, locations, moq, materials, userEmail} = data;
  // let transporter = nodemailer.createTransport({
  //   service: "smtp.zaxexchange.com",
  //   port: 465,
  //   secure: true,
  //   "auth": {
  //     user: process.env.NODE_MAILER_USERNAME,
  //     pass: process.env.NODE_MAILER_PASSWORD
  //   }
  // }) 

  const createTransporter = async () => {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        type: "OAuth2",
        user: process.env.NODE_MAILER_USERNAME,
        privateKey: process.env.OAUTH_PRIVATE_KEY,
        serviceClient: process.env.OAUTH_CLIENT_ID,
        accessToken: process.env.OAUTH_ACCESS_TOKEN,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    } as SMTPTransport.Options);

    return transporter;
  };
  const sendEmail = async (emailOptions: Options) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };

  const options = {
    from: process.env.NODE_MAILER_USERNAME,
    to:userEmail,
    subject: "TEST",
    text: "test message" 
  }

  const companies = sequelize.models.companies;
  const company_plans = sequelize.models.company_plans;

  // send email invitation to userEmail

  try {
    await sequelize.transaction(async (transaction) => {

      await CompanyApiUtils.checkCreditCardValidity(creditCardNumber, creditCardCvv, creditCardExp);
      const isDuplicate = await CompanyApiUtils.isDuplicateCompanyNames(name);
      if (isDuplicate) {
        throw new Error("Duplicate company names");
      }
      const companyId = await companies.create({
        name,
        logo,
        phone,
        fax,
        creditCardNumber,
        creditCardCvv,
        creditCardExp,
        country,
        isActive,
        isVendor,
        isVerified,
        leadTime,
        companyUrl,
        locations, 
        moq,
        materials
      }, {transaction}).then(c => c.getDataValue("id"));
      const plan = await getPlanWithPlanId(planId, transaction);
      
      await company_plans.create({
        companyId,
        planId,
        remainingQuota: plan.licensedUsers
      }, {transaction});


      if (isVendor) {
        // leadTime, locations, moq, materials will be required for vendor
        ElasticCompanyService.createVendorDocument({ 
          id: companyId, 
          leadTime: leadTime!, 
          locations: locations!,
          moq: moq!,
          materials: materials!
        });
      }

      await sendEmail(options)
    });
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
}



export { 
  createCompany
};