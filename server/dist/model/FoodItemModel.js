import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
const FoodItemSchemaJoi = Joi.object({
    name: Joi.string().min(6).max(50).required().messages({
        "string.min": "Name must be at least 6 characters",
        "string.max": "Name should be not more than 50 characters",
        "any.required": "Name cannot be empty!",
    }),
    description: Joi.string().min(50).max(200).required().messages({
        "string.min": "Name must be at least 6 characters",
        "string.max": "Name should be not more than 20 characters",
        "any.required": "Name cannot be empty!",
    }),
    restaurant: Joi.string()
        .required()
        .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "Object Validation")
        .messages({
        "any.required": "Restaurant is required!",
        "any.invalid": "Restaurant must be valid object id!",
    }),
    subCategory: Joi.string()
        .required()
        .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "Object Validation")
        .messages({
        "any.required": "Category is required!",
        "any.invalid": "Category must be valid object id!",
    }),
    menu: Joi.string()
        .required()
        .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "Object Validation")
        .messages({
        "any.required": "Menu is required!",
        "any.invalid": "Menu must be valid object id!",
    }),
    price: Joi.number()
        .required()
        .messages({ "any.required": "Price cannot be empty!" }),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
            .valid("image/jpeg", "image/png", "image/webp", "image/avif")
            .required(),
        size: Joi.number().max(1024 * 1024 * 8),
    }),
    isAvailable: Joi.boolean(),
});
const FoodItemSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants",
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sub_category",
        required: true,
    },
    price: {
        type: Number,
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food_menus",
        required: true,
    },
    image: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const FoodItemModel = mongoose.model("food_items", FoodItemSchema);
export { FoodItemModel, FoodItemSchemaJoi };
//# sourceMappingURL=FoodItemModel.js.map