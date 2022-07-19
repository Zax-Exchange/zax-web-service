import { users } from "../../../app/api/models/users";
import { companies } from "../../../app/api/models/companies";
import { plans } from "../../../app/api/models/plans";
import { createUser } from "../../../app/api/user/createUserApis";
import { updateUser, updateUserPower} from "../../../app/api/user/updateUserApis";
import { getUserWithUserId } from "../../../app/api/user/getUserApis";
import { createCompany } from "../../../app/api/company/createCompanyApis";
import { CreateCompanyInput } from '../../../app/api/types/create/companyTypes';
import { initModels } from '../../../app/api/models/init-models';
import sequelize from "../../../app/postgres/dbconnection";
import { UpdateUserInput, UpdateUserInputData } from "../../../app/api/types/update/userTypes";
// import * as jest from "ts-jest";

// jest.mock("../../../api/user/createUserApis");

import {
  FREE_PLAN_NAME,
  ADMIN_EMAILS,
  NON_ADMIN_EMAILS,
  VENDOR_COMPANY_NAME,
  CUSTOMER_COMPANY_NAME,
  VENDOR_EMAILS,
  CUSTOMER_EMAILS
} from "../../constants";

process.env.NODE_ENV = "test";

jest.setTimeout(100000);

describe('user tests', () => {

  beforeAll((done) => {
    initModels(sequelize);
    done()
  });

  afterAll((done) => {
    // sequelize.models.companies.destroy({ truncate: true ,cascade: true });
    done()
  });

  // it("should not create user without company", async () => {
  //   await createUser({
  //     name: "joe",
  //     email: "123@email.com",
  //     companyId: 1,
  //     password: "123"
  //   })
  //   .catch(e => {
  //     expect(e).toEqual(Error("No company plan found."));
  //   })
  // });

  it("should create user with company and decrease company quota", async () => {
    const planId = await sequelize.models.plans.findOne({where: {name: FREE_PLAN_NAME}}).then(p => p!.get("id") as number);
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
      planId,
      materials: ["paper", "molded fiber"],
      moq: 10000,
      locations: ["USA", "China"],
      leadTime: 6
    })).resolves.toEqual(true);

    await expect(createCompany({
      name: CUSTOMER_COMPANY_NAME,
      phone: "123-456-7890",
      creditCardNumber:"1234-1111-1111-1111",
      creditCardExp: "07/23",
      creditCardCvv: "012",
      country: "USA",
      isActive: true,
      isVendor: false,
      isVerified: true,
      planId
    })).resolves.toEqual(true);
    
    const vendorCompanId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAME}}).then(c => c!.get("id") as number);
    const customerCompanyId = await sequelize.models.companies.findOne({where:{name: CUSTOMER_COMPANY_NAME}}).then(c => c!.get("id") as number);

    // create vendor company users
    await expect(createUser({
      name: "test",
      email: ADMIN_EMAILS[0],
      companyId: vendorCompanId,
      password: "123"
    })).resolves.toEqual(true);

    // should not allow duplicate user emails
    await expect(createUser({
      name: "test",
      email: ADMIN_EMAILS[0],
      companyId: vendorCompanId,
      password: "123"
    })).rejects.toBeInstanceOf(Error)


    await expect(createUser({
      name: "test",
      email: NON_ADMIN_EMAILS[0],
      companyId: vendorCompanId,
      password: "123"
    })).resolves.toEqual(true);

    // create customer company users
    await expect(createUser({
      name: "test",
      email: CUSTOMER_EMAILS[0],
      companyId: customerCompanyId,
      password: "123"
    })).resolves.toEqual(true);

    await expect(createUser({
      name: "test",
      email: CUSTOMER_EMAILS[1],
      companyId: customerCompanyId,
      password: "123"
    })).resolves.toEqual(true);

    const user1Id = await sequelize.models.users.findOne({ where: {email: ADMIN_EMAILS[0]}}).then(u => u?.get("id") as number);
    const user2Id = await sequelize.models.users.findOne({ where: {email: NON_ADMIN_EMAILS[0]}}).then(u => u?.get("id") as number);
    console.log({user1Id, user2Id})
    const user1 = await getUserWithUserId(user1Id);
    const user2 = await getUserWithUserId(user2Id);

    expect(user1.isAdmin).toEqual(true);
    expect(user1.isVendor).toEqual(true);
    expect(user2.isAdmin).toEqual(false);
  });


  it("should allow update user data", async () => {
    const userId = await sequelize.models.users.findOne({ where: {email: ADMIN_EMAILS[0]}}).then(u => u?.get("id") as number);

    await expect(updateUser({
      id: userId,
      data: {

      } as UpdateUserInputData
    })).resolves.toEqual(true);

    await expect(updateUser({
      id: userId,
      data: {
        name: "updated name",
      } as UpdateUserInputData
    })).resolves.toEqual(true);

    await expect(updateUser({
      id: userId,
      data: {
        password: "321"
      } as UpdateUserInputData
    })).resolves.toEqual(true);
  });

  it("should allow user power update from admin user", async() => {
    const adminUserId = await sequelize.models.users.findOne({ where: {email: ADMIN_EMAILS[0]}}).then(u => u?.get("id") as number);
    const nonAdminUser1Id = await sequelize.models.users.findOne({ where: {email: NON_ADMIN_EMAILS[0]}}).then(u => u?.get("id") as number);

    await expect(updateUserPower({
      isAdmin: true,
      fromId: adminUserId,
      targetId: nonAdminUser1Id
    })).resolves.toEqual(true);

    await expect(getUserWithUserId(nonAdminUser1Id)).resolves.toHaveProperty("isAdmin", true);
  });
});