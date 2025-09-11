import bcrypt from "bcryptjs";
import { createHmac } from "node:crypto";
import { HttpCode } from "../helper/HttpCode.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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
export function AuthCheck(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(HttpCode.unauthorized).json({
                status: false,
                message: "You're not authorized!"
            });
        }
        const token = authHeader.split(" ")[1];
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        if (!jwtSecretKey) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: "JWT secret key is not defined",
            });
        }
        const decoded = jwt.verify(token, jwtSecretKey);
        if (typeof decoded === "object" && decoded !== null && "_id" in decoded && "firstName" in decoded && "lastName" in decoded && "email" in decoded) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: "Invalid token payload",
            });
        }
    }
    catch (error) {
        return res.status(HttpCode.serverError).json({
            status: false,
            message: "Invalid or expired token",
        });
    }
}
//# sourceMappingURL=Auth.js.map