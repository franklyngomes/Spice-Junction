import bcrypt from "bcryptjs";
export function hashPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
}
export function comparePassword(password, hashPassword) {
    const checkPassword = bcrypt.compareSync(password, hashPassword);
    return checkPassword;
}
export function AuthCheck() { }
//# sourceMappingURL=Auth.js.map