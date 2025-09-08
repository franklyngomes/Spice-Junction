import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}
export function comparePassword(password: string, hashPassword: string) {
  const checkPassword = bcrypt.compareSync(password, hashPassword)
  return checkPassword
}

export function AuthCheck() {}
