export default class ErrorUtils {
  static permissionDeniedError() {
    return new Error("permission denied");
  }

  static notFoundError() {
    return new Error("not found");
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
}
