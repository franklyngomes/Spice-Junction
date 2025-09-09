import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
const RoleOptions = {
    customer: "customer",
    admin: "admin",
    restaurant: "restaurant",
};
const UserSchemaJoi = Joi.object({
    firstName: Joi.string().min(3).max(15).required().messages({ "string.min": "First name must be at least 3 characters", "string.max": "First name should be not more than 15 characters", "any.required": "First name cannot be empty!" }),
    lastName: Joi.string().min(3).max(15).required().messages({ "string.min": "Last name must be at least 3 characters", "string.max": "Last name should be not more than 15 characters", "any.required": "Last name cannot be empty!" }),
    email: Joi.string().email().required().messages({ "string.email": "Please provide a valid email", "any.required": "Email is required!" }),
    password: Joi.string()
        .min(8)
        .max(15)
        .required()
        .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#$%^&*_-])[A-Za-z0-9@!#$%^&*_-]+$/)
        .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one number, and one special character",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password should be not more than 15 characters",
        "any.required": "Password is required!",
    }),
    role: Joi.string().valid(...Object.values(RoleOptions)).messages({
        "any.only": "Role must be one of customer, admin, or restaurant"
    }),
    street: Joi.string().min(8).max(20).messages({
        "string.min": "Street must be at least 8 characters",
        "string.max": "Street must be at most 20 characters",
    }),
    city: Joi.string().min(4).max(10).messages({
        "string.min": "City must be at least 4 characters",
        "string.max": "City must be at most 10 characters",
    }),
    pinCode: Joi.string().min(6).max(6).messages({
        "string.min": "Pin code must be exactly 6 characters",
        "string.max": "Pin code must be exactly 6 characters",
    }),
    phone: Joi.string().regex(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Valid phone number is required!",
        "any.required": "Phone is required",
    }),
});
const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: "customer",
    },
    address: [
        {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            pinCode: {
                type: String,
            },
        },
    ],
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    verificationTokenExpires: {
        type: String,
    },
    forgotPasswordCode: {
        type: String,
    },
    forgotPasswordCodeValidation: {
        type: Number,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const UserModel = mongoose.model("users", UserSchema);
export { UserModel, UserSchemaJoi };
//# sourceMappingURL=UserModel.js.map