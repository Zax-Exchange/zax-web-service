
import { createUser } from "../../../app/api/user/createUserApis";
import { createCompany } from "../../../app/api/company/createCompanyApis";
import { getPermissionedCompany, getGeneralCompany } from "../../../app/api/company/getCompanyApis";
import { updateCompany, updateCompanyPlan } from "../../../app/api/company/updateCompanyApis";
import { CreateCompanyInput } from '../../../app/types/create/companyTypes';
import { initModels } from '../../../app/api/models/init-models';
import sequelize from "../../../app/postgres/dbconnection";
import {
  FREE_PLAN_NAME,
  ADMIN_EMAILS,
  NON_ADMIN_EMAILS,
  VENDOR_COMPANY_NAME,
  BASIC_PLAN_NAME
} from "../../constants";
import { UpdateCompanyData, UpdateCompanyInput } from "../../../app/types/update/companyTypes";
import * as enums from "../../../app/types/common/enums";
import type { PermissionedCompany } from "../../../app/types/common/companyTypes";

process.env.NODE_ENV = "test";

describe('company tests', () => {

  beforeAll((done) => {
    initModels(sequelize);
    done()
  });

  afterAll((done) => {
    sequelize.models.companies.destroy({ truncate: true ,cascade: true });
    done()
  });

  it("should allow company creation with plan", async () => {
    const planId = await sequelize.models.plans.findOne({where: {name: FREE_PLAN_NAME}}).then(p => p!.get("id"));
    await expect(createCompany({
      name: VENDOR_COMPANY_NAME,
      phone: "123-456-7890",
      creditCardNumber:"1234-1111-1111-1111",
      creditCardExp: "07/23",
      creditCardCvv: "012",
      country: "USA",
      isActive: true,
      isVendor: true,
      isVerified: true,
      planId
    } as CreateCompanyInput)).resolves.toEqual(true);
  });

  it("should not allow duplicate company names", async () => {
    expect.assertions(1);
    const planId = await sequelize.models.plans.findOne({where: {name: FREE_PLAN_NAME}}).then(p => p!.get("id"));
    await createCompany({
      name: VENDOR_COMPANY_NAME,
      phone: "123-456-7890",
      creditCardNumber:"2222-1111-1111-1111",
      creditCardExp: "07/23",
      creditCardCvv: "012",
      country: "USA",
      isActive: true,
      isVendor: true,
      isVerified: true,
      planId
    } as CreateCompanyInput).catch(e => expect(e).toEqual(Error("Duplicate company names")));
  });

  // it("should not allow company creation without plan", async () => {
  //   expect.assertions(1);
  //   await createCompany({
  //     name: VENDOR_COMPANY_NAME,
  //     phone: "123-456-7890",
  //     creditCardNumber:"1234-1111-1111-1111",
  //     creditCardExp: "07/23",
  //     creditCardCvv: "012",
  //     country: "USA",
  //     isActive: true,
  //     isVendor: true,
  //     isVerified: true,
  //   } as CreateCompanyInput).catch(e => {
  //     expect(e).toBeTruthy();
  //   })
  // });

  it("should allow user creation", async () => {
    const companyId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAME}}).then(c => c!.get("id") as number);
    const companyPlan = await sequelize.models.company_plans.findOne({ where: {companyId}});
    
    await expect(createUser({
      name: "test",
      email: ADMIN_EMAILS[0],
      companyId,
      password: "123"
    })).resolves.toEqual(true);

    await expect(createUser({
      name: "test",
      email: NON_ADMIN_EMAILS[0],
      companyId,
      password: "123"
    })).resolves.toEqual(true);
  });


  // it("should allow user creation after upgrading plan", async () => {
  //   const companyId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAME}}).then(c => c!.get("id") as number);
  //   const planId = await sequelize.models.plans.findOne({where: {name: BASIC_PLAN_NAME}}).then(p => p!.get("id") as number);

  //   expect.assertions(2);

  //   await expect(updateCompanyPlan({companyId, planId})).resolves.toEqual(true);

  //   await expect(createUser({
  //     name: "test",
  //     email: "123@email.com",
  //     companyId,
  //     password: "123"
  //   })).resolves.toEqual(true);
  // });

  // it("should not allow company downgrade if users exceed new plan quota", async () => {
  //   const companyId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAME}}).then(c => c!.get("id") as number);
  //   const planId = await sequelize.models.plans.findOne({where: {name: FREE_PLAN_NAME}}).then(p => p!.get("id") as number);

  //   expect.assertions(2);

  //   await expect(createUser({
  //     name: "test",
  //     email: "1234@email.com",
  //     companyId,
  //     password: "123"
  //   })).resolves.toEqual(true);

  //   try {
  //     await updateCompanyPlan({companyId, planId});
  //   } catch(e) {
  //     expect(e).toEqual(new Error("Current licensed users exceed new plan quota."))
  //   }
  // });

  it("should get permissioned company based on user power", async () => {
    const adminUserId = await sequelize.models.users.findOne({where: {email: ADMIN_EMAILS[0]}}).then(u => u?.get("id") as number);
    const nonAdminUserId = await sequelize.models.users.findOne({where: {email: NON_ADMIN_EMAILS[0]}}).then(u => u?.get("id") as number);
    const companyId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAME}}).then(c => c!.get("id") as number);
    
    const res1 = await getPermissionedCompany({
      companyId,
      userId: nonAdminUserId
    });
    const res2 = await getPermissionedCompany({
      companyId,
      userId: adminUserId
    });
    expect(res1).toHaveProperty(["isAdmin"], false);
    expect(res2).toHaveProperty(["isAdmin"], true);

  });

  // it("should not allow non-admins to make changes to company data", async () => {
  //   const companyId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAME}}).then(c => c!.get("id") as number);
  //   const userId = await sequelize.models.users.findOne({where: {email: NON_ADMIN_EMAILS[1]}}).then(u => u?.get("id") as number);
    
  //   expect.assertions(1);
  //   try {
  //     await updateCompany({
  //       "data": {
  //         "name": "updated name",
  //         "companyUrl": "example.company.com"
  //       } as UpdateCompanyData,
  //       "id": companyId,
  //       userId
  //     })
  //   } catch(e) {
  //     expect(e).toEqual(new Error("Permission denied"));
  //   }
  // });

  it("should allow users to make changes to company data", async () => {
    const companyId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAME}}).then(c => c!.get("id") as number);
    const userId = await sequelize.models.users.update({ isAdmin: true },{where: {email: ADMIN_EMAILS[0]}, returning: true}).then(u => u[1][0].get("id") as number);


    await expect(updateCompany({
      "data": {
        "name": "updated name",
        "companyUrl": "example.company.com"
      } as UpdateCompanyData,
      "id": companyId,
      userId
    })).resolves.toEqual(true);
  });
})

