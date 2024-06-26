import { users } from "../../../app/api/models/users";
import { companies } from "../../../app/api/models/companies";
import { plans } from "../../../app/api/models/plans";
import { createUser } from "../../../app/api/user/createUserApis";
import { updateUser, updateUserPower} from "../../../app/api/user/updateUserApis";
import { getUserWithUserId } from "../../../app/api/user/getUserApis";
import { createCustomer, createVendor } from "../../../app/api/company/createCompanyApis";
import { CreateCustomerInput, CreateVendorInput } from '../../../app/api/types/create/companyTypes';
import { initModels } from '../../../app/api/models/init-models';
import sequelize from "../../../app/postgres/dbconnection";
import { UpdateUserInput, UpdateUserInputData } from "../../../app/api/types/update/userTypes";
// import * as jest from "ts-jest";

// jest.mock("../../../api/user/createUserApis");

import {
  FREE_PLAN_NAME,
  ADMIN_EMAILS,
  NON_ADMIN_EMAILS,
  VENDOR_COMPANY_NAMES,
  CUSTOMER_COMPANY_NAMES,
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
    sequelize.models.companies.destroy({ truncate: true ,cascade: true });
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
    const planId = await sequelize.models.plans.findOne({where: {name: FREE_PLAN_NAME}}).then(p => p!.get("id") as string);
    await expect(createVendor({
      name: VENDOR_COMPANY_NAMES[0],
      phone: "123-456-7890",
      country: "USA",
      isActive: true,
      isVendor: true,
      isVerified: true,
      planId,
      materials: ["paper", "molded fiber"],
      moq: "10000-30000",
      locations: ["USA", "China"],
      leadTime: 6,
      userEmail: "test@email.com"
    })).resolves.toEqual(true);

    await expect(createCustomer({
      name: CUSTOMER_COMPANY_NAMES[0],
      phone: "123-456-7890",
      country: "USA",
      isActive: true,
      isVendor: false,
      isVerified: true,
      planId,
      userEmail: "test@email.com"
    })).resolves.toEqual(true);
    
    const vendorCompanId = await sequelize.models.companies.findOne({where:{name: VENDOR_COMPANY_NAMES[0]}}).then(c => c!.get("id") as string);
    const customerCompanyId = await sequelize.models.companies.findOne({where:{name: CUSTOMER_COMPANY_NAMES[0]}}).then(c => c!.get("id") as string);

    // create vendor company users
    await expect(createUser({
      name: "test",
      email: ADMIN_EMAILS[0],
      companyId: vendorCompanId,
      password: "123"
    })).resolves.toBeTruthy();

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
    })).resolves.toBeTruthy();

    // create customer company users
    await expect(createUser({
      name: "test",
      email: CUSTOMER_EMAILS[0],
      companyId: customerCompanyId,
      password: "123"
    })).resolves.toBeTruthy();

    await expect(createUser({
      name: "test",
      email: CUSTOMER_EMAILS[1],
      companyId: customerCompanyId,
      password: "123"
    })).resolves.toBeTruthy();

    const user1Id = await sequelize.models.users.findOne({ where: {email: ADMIN_EMAILS[0]}}).then(u => u?.get("id") as string);
    const user2Id = await sequelize.models.users.findOne({ where: {email: NON_ADMIN_EMAILS[0]}}).then(u => u?.get("id") as string);

    const user1 = await getUserWithUserId(user1Id);
    const user2 = await getUserWithUserId(user2Id);

    expect(user1.isAdmin).toEqual(true);
    expect(user1.isVendor).toEqual(true);
    expect(user2.isAdmin).toEqual(false);
  });


  it("should allow update user data", async () => {
    const userId = await sequelize.models.users.findOne({ where: {email: ADMIN_EMAILS[0]}}).then(u => u?.get("id") as string);

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
  });

  it("should allow user power update from admin user", async() => {
    const adminUserId = await sequelize.models.users.findOne({ where: {email: ADMIN_EMAILS[0]}}).then(u => u?.get("id") as string);
    const nonAdminUser1Id = await sequelize.models.users.findOne({ where: {email: NON_ADMIN_EMAILS[0]}}).then(u => u?.get("id") as string);

    await expect(updateUserPower({
      isAdmin: true,
      id: nonAdminUser1Id
    })).resolves.toEqual(true);

    await expect(getUserWithUserId(nonAdminUser1Id)).resolves.toHaveProperty("isAdmin", true);
  });
});