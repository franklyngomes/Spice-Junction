import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
const SubCategorySchemaJoi = Joi.object({
    name: Joi.string().min(3).max(15).required().messages({
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name should be not more than 15 characters",
        "any.required": "Name cannot be empty!",
    }),
    category: Joi.string()
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
    items: Joi.array().items({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        image: Joi.string(),
    }),
});
const SubCategorySchema = new Schema({
    name: {
        type: String,
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },
    ],
    image: {
        type: String,
        required: true,
    },
    categoryNo: {
        type: String,
        unique: true,
    },
    items: [
        {
            id: {
                type: String,
            },
            name: {
                type: String,
            },
            description: {
                type: String,
            },
            price: {
                type: Number,
            },
            image: {
                type: String,
            },
        },
    ],
}, { timestamps: true });
SubCategorySchema.pre("validate", async function (next) {
    if (!this.categoryNo) {
        const prefix = this.name?.slice(0, 3).toUpperCase();
        this.categoryNo = `${prefix}-${nanoid()}`;
    }
});
const SubCategoryModel = mongoose.model("sub_category", SubCategorySchema);
export { SubCategoryModel, SubCategorySchemaJoi };
//# sourceMappingURL=SubCategoryModel.js.map