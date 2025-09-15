import { HttpCode } from "../helper/HttpCode.js";
import { UserModel, UserSchemaJoi } from "../model/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
import { comparePassword, hashPassword, hmacProcess, } from "../middleware/Auth.js";
import transporter from "../middleware/SendMail.js";
import jwt from "jsonwebtoken";
import { RestaurantModel } from "../model/ResturantModel.js";
class UserController {
    async signup(req, res) {
        try {
            const { firstName, lastName, email, phone, password, role } = req.body;
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
                from: `Spice Junction ${process.env.NODEMAILER_EMAIL}`,
                to: email,
                subject: "Verify Your Email - Spice Junction",
                html: `
      <body style="margin: 0; padding: 0; <body style="margin: 0; padding: 0; background-image:url('url/background.png'); background-position: top; background-repeat: no-repeat; background-size: cover">
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
                <h4>Hello <span style="color: #F90912;">${firstName}</span>,</h4> <h5>Welcome to Spice Junction! Please verify your email</h5>
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
    async adminSignup(req, res) {
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
                    message: "Admin with this email already exists!",
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
                role: "admin",
                verificationToken,
                verificationTokenExpires: Date.now() + 10 * 60 * 1000,
            });
            await newUser.save();
            await transporter.sendMail({
                from: `Spice Junction ${process.env.NODEMAILER_EMAIL}`,
                to: email,
                subject: "Verify Your Email - Spice Junction",
                html: `
      <body style="margin: 0; padding: 0; <body style="margin: 0; padding: 0; background-image:url('url/background.png'); background-position: top; background-repeat: no-repeat; background-size: cover">
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
              <h4>Hello <span style="color: #F90912;">${firstName}</span>,</h4>
                <h5>Welcome to Spice Junction! Please verify your email to get started for <span style="color: #F90912;">Admin privileges<span></h5>
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
    async restaurantSignup(req, res) {
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
                    message: "Admin with this email already exists!",
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
                role: "restaurant",
                verificationToken,
                verificationTokenExpires: Date.now() + 10 * 60 * 1000,
            });
            await newUser.save();
            await transporter.sendMail({
                from: `Spice Junction ${process.env.NODEMAILER_EMAIL}`,
                to: email,
                subject: "Verify Your Email - Spice Junction",
                html: `
      <body style="margin: 0; padding: 0; <body style="margin: 0; padding: 0; background-image:url('url/background.png'); background-position: top; background-repeat: no-repeat; background-size: cover">
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
                <h4>Hello <span style="color: #F90912;">${firstName}</span>, </h4>
                <h5>Welcome to Spice Junction! Please verify your email to get started with your <span style="color: #F90912;">Restaurant Account<span></h5>
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
            const accessToken = jwt.sign({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user?.email,
                role: user?.role,
            }, jwtSecretKey, { expiresIn: "3d" });
            //Refresh
            const refreshToken = jwt.sign({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user?.email,
                role: user?.role,
            }, jwtSecretKey, { expiresIn: "7d" });
            user.refreshToken = refreshToken;
            await user.save();
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            return res.status(HttpCode.success).json({
                status: true,
                message: "Logged in successfully!",
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user?.email,
                    role: user?.role,
                },
                accessToken: accessToken,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async refreshToken(req, res) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "Refresh token not found!",
                });
            }
            const user = await UserModel.findOne({ refreshToken: token });
            if (!user) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Invalid refresh token!",
                });
            }
            const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
            if (!jwtRefreshSecretKey) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "JWT refresh secret key is missing!",
                });
            }
            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            if (!jwtSecretKey) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "JWT Secret key is missing!",
                });
            }
            jwt.verify(token, jwtRefreshSecretKey, async (error, decoded) => {
                if (error) {
                    return res.status(HttpCode.unauthorized).json({
                        status: false,
                        message: "Invalid or expired refresh token",
                    });
                }
                //New Access Token
                const newAccessToken = jwt.sign({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user?.email,
                    role: user?.role,
                }, jwtSecretKey, { expiresIn: "3hr" });
                //New Refresh Token
                const newRefreshToken = jwt.sign({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user?.email,
                    role: user?.role,
                }, jwtRefreshSecretKey, { expiresIn: "7d" });
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });
                return res.status(HttpCode.success).json({
                    status: true,
                    message: "New access token generated",
                    accessToken: newAccessToken,
                });
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "User not found!",
                });
            }
            const code = Math.floor(Math.random() * 1000000).toString();
            const mail = await transporter.sendMail({
                from: `Spice Junction ${process.env.NODEMAILER_EMAIL}`,
                to: email,
                subject: "Rest password OTP",
                html: `<body style="margin: 0; padding: 0; background-image:url('url/background.png'); background-position: top; background-repeat: no-repeat; background-size: cover">
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
              <td align="center" style="font-size: 20px; font-weight: bold; color: #F90912; padding-bottom: 10px;">
                <h4>Hello ${user.firstName}</h4>
              </td>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 14px; color: #374151; padding-bottom: 10px;">
                Use this OTP to reset your password
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 16px; color: #F90912; padding-bottom: 10px;">
                <strong>${code}</strong> <br />
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
            const hmacSecretKey = process.env.HMAC_VERIFICATION_SECRET;
            if (!hmacSecretKey) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "JWT Secret key is missing!",
                });
            }
            if (mail.accepted[0] === user.email) {
                const hashCode = hmacProcess(code, hmacSecretKey);
                user.forgotPasswordCode = hashCode;
                user.forgotPasswordCodeValidation = Date.now();
                await user.save();
                return res.status(HttpCode.success).json({
                    status: true,
                    message: "OTP for reset password sent!",
                });
            }
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async resetPassword(req, res) {
        try {
            const { email, code, newPassword } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "User not found!",
                });
            }
            if (!user.forgotPasswordCode || !user.forgotPasswordCodeValidation) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Cannot reset password, Try again!",
                });
            }
            if (Date.now() - user.forgotPasswordCodeValidation > 5 * 60 * 100000) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "OTP expired, Try again!",
                });
            }
            const hmacSecretKey = process.env.HMAC_VERIFICATION_SECRET;
            if (!hmacSecretKey) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "JWT Secret key is missing!",
                });
            }
            const encryptCode = hmacProcess(code, hmacSecretKey);
            if (encryptCode === user.forgotPasswordCode) {
                const encryptPassword = hashPassword(newPassword);
                user.password = encryptPassword;
                user.forgotPasswordCode = null;
                user.forgotPasswordCodeValidation = null;
                await user.save();
                return res.status(HttpCode.success).json({
                    status: true,
                    message: "Password reset successful",
                });
            }
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async userProfile(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.find({ _id: { $eq: id } }, {
                _id: 1,
                firstName: 1,
                lastName: 1,
                role: 1,
                email: 1,
                phone: 1,
                address: 1,
            });
            if (!user) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "User not found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: true,
                message: "User details fetched successfully",
                data: user,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message || error,
            });
        }
    }
    async restaurantRequests(req, res) {
        try {
            const requests = await RestaurantModel.find({ isApproved: false });
            if (!requests || requests.length === 0) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "No new requests!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Requests fetched successfully",
                data: requests,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async responseRestaurantRequest(req, res) {
        try {
            const id = req.params.id;
            const { response } = req.body;
            const restaurant = await RestaurantModel.findByIdAndUpdate(id, req.body);
            if (!restaurant) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "Restaurant not found!",
                });
            }
            if (response === true) {
                restaurant.isApproved = true;
                await restaurant.save();
                return res.status(HttpCode.success).json({
                    status: true,
                    message: "Request Approved",
                });
            }
            else {
                restaurant.isApproved = false;
                await restaurant.save();
                return res.status(HttpCode.success).json({
                    status: true,
                    message: "Request Rejected!",
                });
            }
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
}
export default new UserController();
//# sourceMappingURL=UserController.js.map