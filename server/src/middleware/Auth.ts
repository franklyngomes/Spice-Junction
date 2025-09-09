import bcrypt from "bcryptjs";
import { createHmac } from "node:crypto";

export function hashPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}
export function comparePassword(password: string, hashPassword: string) {
  const checkPassword = bcrypt.compareSync(password, hashPassword)
  return checkPassword
}
export const hmacProcess = (value : string, key : string) => {
  const result = createHmac("sha256", key).update(value).digest("hex");
  return result
}

export function AuthCheck() {}
