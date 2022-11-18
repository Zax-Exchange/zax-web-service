export default class ErrorUtils {
  static permissionDeniedError() {
    return new Error("permission denied");
  }

  static notFoundError() {
    return new Error("not found");
  }
}
