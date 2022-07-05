import { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} from'sequelize-test-helpers';

import { users } from "../api/models/users";


describe('Hello function', () => {
  it('user model test', () => {
    const User = users.initModel(sequelize);
    const user = new User();

    checkModelName(User)('users')

    context('properties', () => {
      ["name", "email", "password", "companyId", "isAdmin", "isActive", "isVendor"].forEach(checkPropertyExists(user))
    })
  });
});