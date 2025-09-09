import bcrypt from "bcryptjs";
import { createHmac } from "node:crypto";
export function hashPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
}
export function comparePassword(password, hashPassword) {
    const checkPassword = bcrypt.compareSync(password, hashPassword);
    return checkPassword;
}
export const hmacProcess = (value, key) => {
    const result = createHmac("sha256", key).update(value).digest("hex");
    return result;
};
export function AuthCheck() { }
//# sourceMappingURL=Auth.js.map