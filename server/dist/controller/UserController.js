import { HttpCode } from "../helper/HttpCode.js";
import { UserModel, UserSchemaJoi } from "../model/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
import { comparePassword, hashPassword } from "../middleware/Auth.js";
import transporter from "../middleware/SendMail.js";
import jwt from "jsonwebtoken";
class UserController {
    async signup(req, res) {
        try {
            const { firstName, lastName, email, phone, password } = req.body;
            if (!firstName || !lastName || !email || !phone || !password) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "All fields are required!",
                });
            }
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "User with this email already exists!",
                });
            }
            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            if (!jwtSecretKey) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "JWT Secret key is missing!",
                });
            }
            const verificationToken = jwt.sign({ email }, jwtSecretKey, {
                expiresIn: "10m",
            });
            const verificationLink = `http://localhost:5000/verify-email?token=${verificationToken}`;
            const { value, error } = UserSchemaJoi.validate(req.body);
            if (error) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: error?.message,
                });
            }
            const hash = hashPassword(password);
            const newUser = new UserModel({
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                password: hash,
                phone: value.phone,
                verificationToken,
                verificationTokenExpires: Date.now() + 10 * 60 * 1000,
            });
            await newUser.save();
            await transporter.sendMail({
                from: `Spice Junction franklyn.office@gmail.com`,
                to: email,
                subject: "Verify Your Email - Spice Junction",
                html: `
      <body style="margin: 0; padding: 0; background-color: #f4f4f5;">
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="padding: 40px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="max-width: 500px; background-color: #ffffff; border-radius: 12px; padding: 40px 20px; font-family: Arial, sans-serif;"
          >
            <tr>
              <td align="center" style="font-size: 24px; font-weight: bold; color: #111827; padding-bottom: 10px;">
                <h4>Hello ${firstName} <br>Welcome to Spice Junction, Please verify your email</h4>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 14px; color: #6b7280; padding-bottom: 30px;">
                To use Spice Junction, click the verification button. This helps keep your account secure.
              </td>
            </tr>
            <tr>
              <td align="center">
                <a
                  href=${verificationLink}
                  style="display: inline-block; background-color: #F90912; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: bold; border-radius: 6px;"
                >
                  Verify Email
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 12px; color: #6b7280; padding-top: 30px;">
                You're receiving this email because you have an account in Spice Junction. If you are not sure why you're receiving this, please contact us by replying to this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
      `,
            });
            return res.status(HttpCode.create).json({
                status: true,
                message: "Registration successful, Please verify your email",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async verifyEmail(req, res) {
        try {
            const { token } = req.query;
            if (!token || typeof token !== "string") {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "A valid verification token is required!",
                });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            let email;
            if (typeof decoded === "object" &&
                decoded !== null &&
                "email" in decoded) {
                email = decoded.email;
            }
            else {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Invalid token payload!",
                });
            }
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "User not found!",
                });
            }
            if (user?.verified) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "User is already verified!",
                });
            }
            user.verified = true;
            await user.save();
            return res.status(HttpCode.success).json({
                status: true,
                message: "User verified successfully",
            });
        }
        catch (error) {
            if (error?.name === "TokenExpiredError") {
                return res.status(HttpCode.unauthorized).json({
                    status: false,
                    message: "Verification token expired",
                });
            }
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "User not found",
                });
            }
            if (!user.password || typeof user.password !== "string") {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "User password is invalid or missing",
                });
            }
            const isMatch = comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Incorrect password!",
                });
            }
            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            if (!jwtSecretKey) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "JWT Secret key is missing!",
                });
            }
            //Access
            const token = jwt.sign({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user?.email,
                role: user?.role,
            }, jwtSecretKey, { expiresIn: "3hr" });
            //Refresh
            const refreshToken = jwt.sign({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user?.email,
                role: user?.role,
            }, jwtSecretKey, { expiresIn: "7d" });
            user.refreshToken = refreshToken;
            await user.save();
            return res.status(HttpCode.success).json({
                status: true,
                message: "Logged in successfully!",
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user?.email,
                    role: user?.role,
                },
                token: token,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async forgotPassword(req, res) { }
    async resetPassword(req, res) { }
}
export default new UserController();
//# sourceMappingURL=UserController.js.map