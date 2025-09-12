import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
const RestaurantSchemaJoi = Joi.object({
    name: Joi.string().min(6).max(35).required().messages({
        "string.min": "Name must be at least 6 characters",
        "string.max": "Name should be not more than 35 characters",
        "any.required": "Name cannot be empty!",
    }),
    ownerId: Joi.string()
        .required()
        .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "Object Validation")
        .messages({
        "any.required": "Owner id is required!",
        "any.invalid": "Owner id must be valid object id!",
    }),
    buildingNo: Joi.string().min(2).max(15).required().messages({
        "string.min": "Building No. must be at least 2 characters",
        "string.max": "Building No. should be not more than 10 characters",
        "any.required": "Building No. cannot be empty!",
    }),
    street: Joi.string().min(8).max(120).required().messages({
        "string.min": "Street must be at least 8 characters",
        "string.max": "Street should be not more than 120 characters",
        "any.required": "Street cannot be empty!",
    }),
    city: Joi.string().min(4).max(20).required().messages({
        "string.min": "City must be at least 4 characters",
        "string.max": "City should be not more than 20 characters",
        "any.required": "City cannot be empty!",
    }),
    pinCode: Joi.string().min(6).max(6).required().messages({
        "string.min": "Pin Code must be at least 6 characters",
        "string.max": "Pin Code should be not more than 6 characters",
        "any.required": "Pin Code cannot be empty!",
    }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        "string.pattern.base": "Phone number must be exactly 10 digits.",
        "any.required": "Phone number is required."
    }),
    deliveryZone: Joi.array()
        .items(Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "Object Validation"))
        .required()
        .messages({
        "any.required": "Delivery zone is required!",
        "any.invalid": "Delivery zone must be valid object id!",
    }),
    image: Joi.string(),
    cuisine: Joi.array()
        .items(Joi.string())
        .required()
        .messages({ "any.required": "Cuisine is required!" }),
});
const RestaurantSchema = new Schema({
    name: {
        type: String,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    address: {
        buildingNo: {
            type: String,
        },
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
    phone: {
        type: String,
    },
    deliveryZone: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "delivery_zones",
        },
    ],
    image: {
        type: String,
    },
    cuisine: [
        {
            type: String,
        },
    ],
    isApproved: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);
export { RestaurantModel, RestaurantSchemaJoi };
//# sourceMappingURL=ResturantModel.js.map