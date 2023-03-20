export default class ErrorUtils {
  static permissionDeniedError() {
    return new Error("permission denied");
  }

  static notFoundError() {
    return new Error("not found");
  }

  static existingUserError() {
    return new Error("existing user");
  }

  static duplicateEmailError() {
    return new Error("duplicate email");
  }

  static userAccountInactiveError() {
    return new Error("inactive account");
  }

  static companyInactiveError() {
    return new Error("inactive company");
  }

  static credentialsError() {
    return new Error("incorrect credentials");
  }

  static expiredTokenError() {
    return new Error("token expired");
  }

  static invalidTokenError() {
    return new Error("invalid token");
  }

  static restrictedForFreePlanError() {
    return new Error("restricted for free plan");
  }
}
