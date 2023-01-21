import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export default class TokenUtils {
  static generateJwtToken(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions | undefined
  ) {
    return jwt.sign(payload, secretOrPrivateKey, options);
  }
}
